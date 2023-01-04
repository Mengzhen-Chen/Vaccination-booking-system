package com.example.vaccination.portal.security;

import com.example.vaccination.portal.model.Role;
import com.example.vaccination.portal.model.RoleEnum;
import com.example.vaccination.portal.model.User;
import com.example.vaccination.portal.repository.UserRepository;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.CollectionUtils;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Component
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = new User();
        user.setUsername(username);
        Example<User> userExample = Example.of(user);
        List<User> users = userRepository.findAll(userExample);
        if (CollectionUtils.isEmpty(users)) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }
        UserEntity userEntity = new UserEntity();
        BeanUtils.copyProperties(users.get(0), userEntity);
        Role role = new Role();
        role.setName(RoleEnum.ROLE_USER);
        userEntity.setRoles(new ArrayList<>(Collections.singleton(role)));
        return UserDetailsImpl.build(userEntity);
    }
}
