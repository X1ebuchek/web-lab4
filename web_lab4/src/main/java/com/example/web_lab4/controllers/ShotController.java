package com.example.web_lab4.controllers;

import lombok.RequiredArgsConstructor;
import com.example.web_lab4.data.EntryDTO;
import com.example.web_lab4.data.ShotDTO;
import com.example.web_lab4.entity.Entry;
import com.example.web_lab4.entity.User;
import com.example.web_lab4.repository.EntryRepository;
import com.example.web_lab4.service.ShotService;
import com.example.web_lab4.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@RestController
@RequestMapping("/shotApi")
public class ShotController {
    private final UserService userService;
    private final EntryRepository entryRepository;
    private final ShotService shotService;

    @GetMapping(value = "/shots", produces = "application/json")
    ResponseEntity<?> getUserShotsPost(Principal principal) {
        User user = userService.loadUserByUsername(principal.getName());
        return ResponseEntity.ok(entryRepository.findByUser(user).stream().map(ShotDTO::new).collect(Collectors.toList()));
    }

    @PostMapping("/shot")
    ResponseEntity<?> shot(@Valid @RequestBody EntryDTO shot, Principal principal) {
        User user = userService.loadUserByUsername(principal.getName());
        ShotDTO shotDTO = shotService.checkShot(shot);
        entryRepository.save(new Entry(shotDTO, user));
        return ResponseEntity.ok(shotDTO);
    }

    @GetMapping(value = "/count", produces = "application/json")
    ResponseEntity<?> getCount(Principal principal) {
        User user = userService.loadUserByUsername(principal.getName());
        return ResponseEntity.ok(entryRepository.findByUser(user).size());
    }
}
