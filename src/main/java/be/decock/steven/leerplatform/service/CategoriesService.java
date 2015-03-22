package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.Category;
import be.decock.steven.leerplatform.repository.CategoryRepository;
import be.decock.steven.leerplatform.repository.UserRepository;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import static com.google.common.collect.Maps.newHashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Path("/categories")
@Component
public class CategoriesService {
    
    @Autowired
    private CategoryRepository categoryRepository;

    @GET
    @Produces("application/json")
    public List<Category> categories() {
        return categoryRepository.findAll();
    }
    
    @GET
    @Path("/{categoryId}")
    @Produces("application/json")
    public Category category(@PathParam("categoryId") String categoryId) {
        return categoryRepository.findOne(categoryId);
    }
    
}
