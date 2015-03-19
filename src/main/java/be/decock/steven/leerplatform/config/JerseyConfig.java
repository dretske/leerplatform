/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package be.decock.steven.leerplatform.config;

import be.decock.steven.leerplatform.service.CategoriesService;
import be.decock.steven.leerplatform.service.TestsService;
import be.decock.steven.leerplatform.service.UsersService;
import javax.ws.rs.ApplicationPath;
import org.glassfish.jersey.server.ResourceConfig;
import org.springframework.stereotype.Component;

@Component
@ApplicationPath("/rest")
public class JerseyConfig extends ResourceConfig {
    
    public JerseyConfig() {
        register(UsersService.class);
        register(CategoriesService.class);
        register(TestsService.class);
    }
    
}
