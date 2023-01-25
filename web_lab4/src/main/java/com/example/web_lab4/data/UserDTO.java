package com.example.web_lab4.data;

import lombok.Data;
import lombok.NonNull;

@Data
public class UserDTO {
    @NonNull
    private String username;
    @NonNull
    private String password;
}
