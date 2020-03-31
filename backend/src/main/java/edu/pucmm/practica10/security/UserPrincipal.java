package edu.pucmm.practica10.security;

import com.fasterxml.jackson.annotation.JsonIgnore;
import edu.pucmm.practica10.data.User;
import edu.pucmm.practica10.payload.client.ClientResponse;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class UserPrincipal implements UserDetails {
    private Long id;

    private String name;

    private String username;

    private String photo;

//    @JsonIgnore
    private String email;

    @JsonIgnore
    private String password;

    private ClientResponse client;

    private Collection<? extends GrantedAuthority> authorities;

    public UserPrincipal(Long id, String name, String username, String photo, String email, String password, ClientResponse client, Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.name = name;
        this.username = username;
        this.photo = photo;
        this.email = email;
        this.password = password;
        this.client = client;
        this.authorities = authorities;
    }

    public static UserPrincipal create(User user) {
        List<GrantedAuthority> authorities = user.getRoles().stream().map(role ->
                new SimpleGrantedAuthority(role.getName())
        ).collect(Collectors.toList());

        return new UserPrincipal(
                user.getId(),
                user.getName(),
                user.getUsername(),
                user.getClient().getPhoto(),
                user.getEmail(),
                user.getPassword(),
                new ClientResponse()
                .setCedula(user.getClient().getCedula())
                .setFirstName(user.getClient().getFirstName())
                .setLastName(user.getClient().getLastName())
                .setId(user.getClient().getId())
                .putRentals(user.getClient().getRentals()),
                authorities
        );
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public ClientResponse getClient() {
        return client;
    }

    public String getPhoto() {
        return photo;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        UserPrincipal that = (UserPrincipal) o;
        return Objects.equals(id, that.id);
    }

    @Override
    public int hashCode() {

        return Objects.hash(id);
    }
}