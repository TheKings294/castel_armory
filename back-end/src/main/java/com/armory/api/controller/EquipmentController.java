package com.armory.api.controller;

import com.armory.api.model.dto.EquipmentRequest;
import com.armory.api.model.entity.Equipment;
import com.armory.api.model.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/equipment")
public class EquipmentController {
    @Autowired
    private EquipmentService equipmentService;

    @GetMapping
    public ResponseEntity<List<Equipment>> getAll() {
        return ResponseEntity.ok(equipmentService.selectAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Equipment> getOne(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(equipmentService.selectOneById(id));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    public ResponseEntity<Equipment> create(@RequestBody EquipmentRequest equipment) {
        Equipment e = new Equipment();
        e.setName(equipment.getName());
        e.setType(equipment.getType());
        e.setIsAvailable(equipment.getIsAvailable());

        Equipment saved = equipmentService.insert(e);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Equipment> update(@PathVariable Long id, @RequestBody Equipment equipment) {
        if (equipment.getId() == null) {
            equipment.setId(id);
        } else if (!equipment.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        try {
            equipmentService.selectOneById(id);
            return ResponseEntity.ok(equipmentService.update(equipment));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            equipmentService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }
}
