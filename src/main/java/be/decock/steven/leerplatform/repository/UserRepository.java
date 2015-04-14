package be.decock.steven.leerplatform.repository;

import be.decock.steven.leerplatform.domain.neo4j.User;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface UserRepository extends GraphRepository<User> {
    
 
}
