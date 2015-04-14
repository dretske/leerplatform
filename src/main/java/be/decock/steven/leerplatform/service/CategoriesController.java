package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.neo4j.Category;
import be.decock.steven.leerplatform.repository.CategoryRepository;
import java.util.Set;
import static jersey.repackaged.com.google.common.collect.Sets.newHashSet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/categories")
public class CategoriesController {

    @Autowired
    private CategoryRepository categoryRepository;
    
    @RequestMapping(method = GET, produces = "application/json")
    public Set<Category> categories() {
        return newHashSet(categoryRepository.findAll());
    }
    
    @RequestMapping(value = "/{categoryId}", method = GET, produces = "application/json")
    public Category category(@PathVariable Long categoryId) {
        return categoryRepository.findOne(categoryId);
    }
    
}
