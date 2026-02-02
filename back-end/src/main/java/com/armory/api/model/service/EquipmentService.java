package com.armory.api.model.service;

import com.armory.api.model.entity.Equipment;
import com.armory.api.model.repository.EquipmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EquipmentService {
    @Autowired
    private EquipmentRepository equipmentRepository;

    public List<Equipment> selectAll() {
        return this.equipmentRepository.findAll();
    }

    public Page<Equipment> selectAll(Pageable pageable) {
        return this.equipmentRepository.findAll(pageable);
    }

    public Equipment selectOneById(Long id) {
        return this.equipmentRepository.findById(id).orElseThrow(
                () -> new RuntimeException("Equipment not found")
        );
    }

    public Equipment insert(Equipment equipment) {
        return this.equipmentRepository.save(equipment);
    }

    public Equipment update(Equipment equipment) {
        return this.equipmentRepository.save(equipment);
    }

    public boolean delete(Equipment equipment) {
        if (!this.equipmentRepository.existsById(equipment.getId())) throw new RuntimeException("Equipment not found");

        this.equipmentRepository.delete(equipment);
        return true;
    }

    public boolean delete(Long id) {
        if (!this.equipmentRepository.existsById(id)) throw new RuntimeException("Equipment not found");

        this.equipmentRepository.deleteById(id);
        return true;
    }
}
