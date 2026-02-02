package com.armory.api.controller;

import com.armory.api.model.dto.AuthenticationRequest;
import com.armory.api.model.dto.AuthenticationResponse;
import com.armory.api.model.dto.RegisterRequest;
import com.armory.api.model.entity.User;
import com.armory.api.model.repository.UserRepository;
import com.armory.api.service.JwtService;
import com.armory.api.type.RoleType;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.hateoas.Link;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import static org.springframework.hateoas.server.mvc.WebMvcLinkBuilder.*;

@RestController
@RequestMapping("/api/auth")
@Tag(name = "Authentication", description = "Authentication management APIs")
@RequiredArgsConstructor
public class AuthenticationController {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @PostMapping("/register")
    @Operation(
            summary = "Register a new user",
            description = "Creates a new user account and returns a JWT token"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User registered successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AuthenticationResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "400",
                    description = "Email already exists",
                    content = @Content
            )
    })
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        var user = User.builder()
                .firstName(request.getFirstName())
                .lastName(request.getLastName())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(RoleType.USER)
                .build();

        userRepository.save(user);
        var jwtToken = jwtService.generateToken(user);

        AuthenticationResponse response = AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();

        response.add(linkTo(methodOn(AuthenticationController.class).getCurrentUser(null)).withRel("me"));
        response.add(linkTo(methodOn(AuthenticationController.class).login(null)).withRel("login"));
        response.add(Link.of("/api/auth/register").withSelfRel());

        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Login user",
            description = "Authenticates a user and returns a JWT token"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "Login successful",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AuthenticationResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Invalid credentials",
                    content = @Content
            )
    })
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );

        var user = userRepository.findByEmail(request.getEmail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);

        AuthenticationResponse response = AuthenticationResponse.builder()
                .token(jwtToken)
                .email(user.getEmail())
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .build();

        // Add HATEOAS links
        response.add(linkTo(methodOn(AuthenticationController.class).getCurrentUser(null)).withRel("me"));
        response.add(linkTo(methodOn(AuthenticationController.class).register(null)).withRel("register"));
        response.add(Link.of("/api/auth/login").withSelfRel());

        return ResponseEntity.ok(response);
    }

    @Operation(
            summary = "Get current user",
            description = "Returns the currently authenticated user's information"
    )
    @ApiResponses(value = {
            @ApiResponse(
                    responseCode = "200",
                    description = "User information retrieved successfully",
                    content = @Content(
                            mediaType = "application/json",
                            schema = @Schema(implementation = AuthenticationResponse.class)
                    )
            ),
            @ApiResponse(
                    responseCode = "401",
                    description = "Unauthorized - Invalid or missing token",
                    content = @Content
            )
    })
    @GetMapping("/me")
    public ResponseEntity<?> getCurrentUser(@RequestHeader("Authorization") String authHeader) {
        String token = authHeader.substring(7);
        String email = jwtService.extractUsername(token);

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        AuthenticationResponse response = new AuthenticationResponse(
                null,
                user.getEmail(),
                user.getFirstName(),
                user.getLastName()
        );

        response.add(linkTo(methodOn(AuthenticationController.class).getCurrentUser(authHeader)).withSelfRel());
        response.add(linkTo(methodOn(AuthenticationController.class).login(null)).withRel("login"));

        return ResponseEntity.ok(response);
    }
}
