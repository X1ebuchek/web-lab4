package com.example.web_lab4.service;

import lombok.NoArgsConstructor;
import com.example.web_lab4.data.EntryDTO;
import com.example.web_lab4.data.ShotDTO;
import org.springframework.stereotype.Service;

import java.time.Clock;
import java.time.Instant;
import java.time.LocalDateTime;

@Service
@NoArgsConstructor
public class ShotService {

    public ShotDTO checkShot(EntryDTO entry){
        long time1 = System.nanoTime();
        ShotDTO ans = new ShotDTO(entry);
        ans.setTime(Instant.now(Clock.systemUTC()));
        ans.setResult(entry.getR() != 0 && isHit(entry.getX(), entry.getY(), entry.getR()));
        long scriptTime = (System.nanoTime()-time1)/1000;
        ans.setScriptTime(scriptTime);
        return ans;
    }

    private boolean isHit(double x, double y, double r){
        if(x < 0 && y > 0)
            return false;

        if(x >= 0 && y >= 0)
            return Math.sqrt(x*x + y*y) <= r;
        //return y <= -x*2 + r;
//            return x <= 1 && y <= 0.5;

        if(x > 0 && y < 0)
            return y>=x-r/2;
//            return y <= x - 1;

        if(x < 0 && y < 0)
            return x>=-r/2 && y>=-r;
        return false;
    }

}