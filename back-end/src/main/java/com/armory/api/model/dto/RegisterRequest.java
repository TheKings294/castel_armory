package com.armory.api.model.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "User registration request")
public class RegisterRequest {
    @JsonProperty("lastName")
    @Schema(description = "Last name", example = "Doe", required = true)
    private String lastName;

    @JsonProperty("firstName")
    @Schema(description = "First name", example = "John", required = true)
    private String firstName;

    @Schema(description = "Email address", example = "john.doe@example.com", required = true)
    private String email;

    @Schema(description = "Password (minimum 8 characters)", example = "securePassword123", required = true)
    private String password;
}
