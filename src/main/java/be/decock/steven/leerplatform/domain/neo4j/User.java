package be.decock.steven.leerplatform.domain.neo4j;

import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;

@NodeEntity
public class User {
 
    @GraphId
    Long id;
    public String name;

    public Long getId() {
        return id;
    }
    
}
