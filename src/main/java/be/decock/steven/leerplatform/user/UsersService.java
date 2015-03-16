/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package be.decock.steven.leerplatform.user;

import com.google.common.collect.Lists;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.springframework.stereotype.Component;

/**
 *
 * @author stevendecock
 */
@Component
@Path("/users")
public class UsersService {
    
    private List<User> users = Lists.newArrayList(new User(1L, "Wies"), new User(2L, "Aster"));
    
    @GET
    @Produces("application/json")
    public User[] users() {
        return users.toArray(new User[users.size()]);
    }
    
}
