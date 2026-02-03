package com.armory.api.model.dto;

import com.armory.api.type.EquipmentType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.springframework.hateoas.RepresentationModel;

@Data
public class EquipmentRequest extends RepresentationModel<EquipmentRequest> {
    @NotBlank
    private String name;

    @NotBlank
    private EquipmentType type;

    @NotNull
    private Boolean isAvailable;
}
