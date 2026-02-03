package com.armory.api.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "User login request")
public class AuthenticationRequest {
    @Schema(description = "Email address", example = "john.doe@example.com", required = true)
    private String email;

    @Schema(description = "Password", example = "securePassword123", required = true)
    private String password;
}
