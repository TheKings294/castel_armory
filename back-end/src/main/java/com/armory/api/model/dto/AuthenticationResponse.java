package com.armory.api.model.dto;

import lombok.*;
import org.springframework.hateoas.RepresentationModel;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode(callSuper = true)
public class AuthenticationResponse extends RepresentationModel<AuthenticationResponse> {
    private String token;
    private String email;
    private String firstName;
    private String lastName;
}
