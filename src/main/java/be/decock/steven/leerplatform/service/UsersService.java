package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.User;
import com.google.common.collect.Lists;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.springframework.stereotype.Component;

@Path("/users")
@Component
public class UsersService {
    
    private final List<User> users = Lists.newArrayList(new User(1L, "Wies"), new User(2L, "Aster"));
    
    @GET
    @Produces("application/json")
    public User[] users() {
        return users.toArray(new User[users.size()]);
    }
    
}
