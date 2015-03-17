package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.Category;
import com.google.common.collect.Lists;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import org.springframework.stereotype.Component;

@Path("/categories")
@Component
public class CategoriesService {
    
    private final List<Category> categories = Lists.newArrayList(
            new Category("rekenen", "Rekenen", "images/rekenenMenuItem.png"),
            new Category("lezen", "Lezen", "images/lezenMenuItem.png"),
            new Category("schrijven", "Schrijven", "images/schrijvenMenuItem.png")
    );
    
    @GET
    @Produces("application/json")
    public Category[] categories() {
        return categories.toArray(new Category[categories.size()]);
    }
    
}
