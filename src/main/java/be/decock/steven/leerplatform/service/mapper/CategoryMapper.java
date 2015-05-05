package be.decock.steven.leerplatform.service.mapper;

import be.decock.steven.leerplatform.domain.neo4j.Category;
import be.decock.steven.leerplatform.service.data.CategoryTO;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper implements Mapper<Category, CategoryTO> {

    @Override
    public CategoryTO mapToTO(Category category) {
        final CategoryTO categoryTO = new CategoryTO();
        
        categoryTO.id = category.getId();
        categoryTO.name = category.getName();
        categoryTO.title = category.getTitle();
        categoryTO.imagePath = category.getImagePath();
        
        return categoryTO;
    }

    @Override
    public Category mapToDomain(CategoryTO to) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
