package be.decock.steven.leerplatform.repository;

import be.decock.steven.leerplatform.domain.Category;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface CategoryRepository extends MongoRepository<Category, String> {
    
}
