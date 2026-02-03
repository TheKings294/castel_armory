package com.armory.api.model.dto;

import com.armory.api.model.entity.Equipment;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.hateoas.RepresentationModel;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class EquipmentResponse extends RepresentationModel<EquipmentResponse> {
    private Long id;
    private String name;

    public EquipmentResponse(Equipment equipment) {
        this.id = equipment.getId();
        this.name = equipment.getName();
    }
}
