package com.example.web_lab4.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import com.example.web_lab4.data.ShotDTO;

import javax.persistence.*;
import java.time.Instant;
import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Entity
@Table(name = "s336424_entry")
public class Entry {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private double x;
    private double y;
    private double r;
    private boolean result;
    private Instant time;
    private long scriptTime;

    @ManyToOne
    @JoinColumn(name = "userid")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private User user;

    public Entry(ShotDTO shotDTO, User user) {
        this.x = shotDTO.getX();
        this.y = shotDTO.getY();
        this.r = shotDTO.getR();
        this.result = shotDTO.isResult();
        this.time = shotDTO.getTime();
        this.scriptTime = shotDTO.getScriptTime();
        this.user = user;
    }
}