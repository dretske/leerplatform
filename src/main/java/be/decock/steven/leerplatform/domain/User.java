package be.decock.steven.leerplatform.domain;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;

public class User {
 
    @Id
    private ObjectId id;
    private String name;
    
    public User() {
    }
    
    public User(String name) {
        this.name = name;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
}
