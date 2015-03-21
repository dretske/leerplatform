package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.User;
import be.decock.steven.leerplatform.repository.UserRepository;
import java.net.URI;
import java.util.List;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import static javax.ws.rs.core.Response.created;
import javax.ws.rs.core.UriInfo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Path("/users")
@Component
public class UsersService {
    
    @Autowired
    private UserRepository userRepository;
    @Context
    private UriInfo uriInfo;
    
    @GET
    @Produces("application/json")
    public List<User> users() {
        return userRepository.findAll();
    }
    
    @POST
    @Consumes("application/json")
    public Response users(User user) {
        User savedUser = userRepository.save(user);
        
        URI location = uriInfo.getAbsolutePathBuilder()
            .path("{id}")
            .resolveTemplate("id", savedUser.getId())
            .build();
        
        return created(location).build();
    }
    
}
