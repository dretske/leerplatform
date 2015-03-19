package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.Category;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import static com.google.common.collect.Maps.newHashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import org.springframework.stereotype.Component;

@Path("/categories")
@Component
public class CategoriesService {
    
    private static final Map<String, Category> categories = newHashMap();
    static {
        categories.put("rekenen", new Category("rekenen", "Rekenen", "images/rekenenMenuItem.png"));
        categories.put("lezen", new Category("lezen", "Lezen", "images/lezenMenuItem.png"));
        categories.put("schrijven", new Category("schrijven", "Schrijven", "images/schrijvenMenuItem.png"));
    }
    
    @GET
    @Produces("application/json")
    public Category[] categories() {
        return categories.values().toArray(new Category[categories.size()]);
    }
    
    @GET
    @Path("/{categoryId}")
    @Produces("application/json")
    public Category category(@PathParam("categoryId") String categoryId) {
        return categories.get(categoryId);
    }
    
}
