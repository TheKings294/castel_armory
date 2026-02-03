package com.armory.api.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.RepresentationModel;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserEquipmentResponse extends RepresentationModel<UserEquipmentResponse> {
    @NotBlank
    private String lastName;

    @NotBlank
    private String firstName;

    @NotBlank
    private List<String> equipment;
}
