package com.armory.api.model.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.RepresentationModel;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Schema(description = "All the user information")
public class UserInformation extends RepresentationModel<UserInformation> {
    @Schema(description = "The id of the user", example = "10")
    private Long id;

    @Schema(description = "The last name of the user", example = "Doe")
    private String lastName;

    @Schema(description = "The first name of the user", example = "John")
    private String firstName;

    @Schema(description = "The email of the user", example = "john.doe@example.com")
    private String email;
}
