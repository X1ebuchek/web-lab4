package com.example.web_lab4.data;

import lombok.Data;
import com.example.web_lab4.entity.Entry;

import java.time.Instant;
import java.time.LocalDateTime;

@Data
public class ShotDTO {
    private double x;
    private double y;
    private double r;
    private boolean result;
    private Instant time;
    private long scriptTime;

    public ShotDTO(Entry entry){
        this.x = entry.getX();
        this.y = entry.getY();
        this.r = entry.getR();
        this.result = entry.isResult();
        this.time = entry.getTime();
        this.scriptTime = entry.getScriptTime();
    }

    public ShotDTO(EntryDTO entry){
        this.x = entry.getX();
        this.y = entry.getY();
        this.r = entry.getR();
    }

}