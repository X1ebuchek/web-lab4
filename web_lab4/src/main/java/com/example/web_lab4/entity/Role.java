package com.example.web_lab4.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.security.core.GrantedAuthority;

import javax.persistence.*;
import java.util.List;

@Data
@NoArgsConstructor
@Entity
@Table(name = "s336424_roles")
public class Role implements GrantedAuthority {
    @Id
    @SequenceGenerator(name = "lab4_role_id_seq", sequenceName = "lab4_role_id_seq", allocationSize = 1)
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "lab4_role_id_seq")
    private long id;
    private String name;

    @ManyToMany(mappedBy = "roles")
    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    private List<User> users;

    @Override
    public String getAuthority() {
        return name;
    }
}