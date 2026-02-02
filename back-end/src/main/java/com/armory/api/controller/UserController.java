package com.armory.api.controller;

import com.armory.api.model.entity.Equipment;
import com.armory.api.model.entity.User;
import com.armory.api.model.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/knights")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(userService.selectAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getOne(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(userService.selectOneById(id));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PostMapping
    public ResponseEntity<User> create(@RequestBody User user) {
        User saved = userService.insert(user);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @RequestBody User user) {
        if (user.getId() == null) {
            user.setId(id);
        } else if (!user.getId().equals(id)) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }

        try {
            userService.selectOneById(id);
            return ResponseEntity.ok(userService.update(user));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        try {
            userService.delete(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @GetMapping("/{id}/equipment")
    public ResponseEntity<UserEquipmentResponse> getEquipment(@PathVariable Long id) {
        try {
            User user = userService.selectOneById(id);
            List<String> equipmentNames = user.getEquipments().stream()
                    .map(Equipment::getName)
                    .collect(Collectors.toList());
            String knightName = user.getFirstName();
            return ResponseEntity.ok(new UserEquipmentResponse(knightName, equipmentNames));
        } catch (RuntimeException ex) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    private record UserEquipmentResponse(String knight, List<String> equipment) {}
}
