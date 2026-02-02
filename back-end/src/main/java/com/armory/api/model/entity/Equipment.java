package com.armory.api.model.entity;

import com.armory.api.type.EquipmentType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
@Entity
public class Equipment extends BaseEntity{
    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private EquipmentType type;

    @Column(nullable = false)
    private Boolean isAvailable = true;

    @ManyToOne
    private User user;
}
