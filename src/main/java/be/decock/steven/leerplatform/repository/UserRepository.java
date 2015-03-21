package be.decock.steven.leerplatform.repository;

import be.decock.steven.leerplatform.domain.User;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<User, Long> {
    
}
