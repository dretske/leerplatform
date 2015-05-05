package be.decock.steven.leerplatform.service.mapper;

import be.decock.steven.leerplatform.domain.neo4j.User;
import be.decock.steven.leerplatform.service.data.UserTO;
import org.springframework.stereotype.Component;

@Component
public class UserMapper implements Mapper<User, UserTO> {

    @Override
    public UserTO mapToTO(User user) {
        UserTO to = new UserTO();
        
        to.id = user.getId();
        to.name = user.getName();
        
        return to;
    }

    @Override
    public User mapToDomain(UserTO to) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
