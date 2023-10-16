package com.Backend.Backend.Entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Table(name="user_db")
@NoArgsConstructor
public class UserInfo {
    @Id
    @Column(name="ID")
    @GeneratedValue
    private int id;

    @Column(name="username")
    private String username;

    @Column(name="password")
    private String password;

    @Column(name="email")
    private String email;

    @Column(name="permission")
    private int permission;

    @Column(name="phone_no")
    private String phoneNo;

    @Column(name="address")
    private String userAddress;
}
