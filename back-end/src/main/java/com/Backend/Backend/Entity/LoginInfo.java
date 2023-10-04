package com.Backend.Backend.Entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class LoginInfo {
    @Id
    private int id;
    private String userName;
    private String email;
    private String password;

    private String phoneNo;
}
