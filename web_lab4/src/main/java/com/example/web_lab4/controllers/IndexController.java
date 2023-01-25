package com.example.web_lab4.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class IndexController {
    @RequestMapping({"/register","/main","/start"})
    public String sendStaticContent(){
        return "/index.html";
    }
}
