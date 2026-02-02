package com.armory.api.model.service;

import com.armory.api.model.entity.User;
import com.armory.api.model.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    public List<User> selectAll() {
        return this.userRepository.findAll();
    }

    public Page<User> selectAll(Pageable pageable) {
        return this.userRepository.findAll(pageable);
    }

    public User selectOneById(Long id) {
        return this.userRepository.findById(id).orElseThrow(
                () -> new RuntimeException("User not found")
        );
    }

    public User insert(User user) {
        return this.userRepository.save(user);
    }

    public User update(User user) {
        return this.userRepository.save(user);
    }

    public boolean delete(User user) {
        if (!this.userRepository.existsById(user.getId())) throw new RuntimeException("User not found");

        this.userRepository.delete(user);
        return true;
    }

    public boolean delete(Long id) {
        if (!this.userRepository.existsById(id)) throw new RuntimeException("User not found");

        this.userRepository.deleteById(id);
        return true;
    }
}
