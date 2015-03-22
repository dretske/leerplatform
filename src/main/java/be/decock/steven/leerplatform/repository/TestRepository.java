package be.decock.steven.leerplatform.repository;

import be.decock.steven.leerplatform.domain.Test;
import java.util.List;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface TestRepository extends MongoRepository<Test, String> {
    
    List<Test> findByCategoryId(String categoryId);
    
}
