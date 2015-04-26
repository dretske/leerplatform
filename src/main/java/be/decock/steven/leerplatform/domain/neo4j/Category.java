package be.decock.steven.leerplatform.domain.neo4j;

import java.util.Set;
import static org.neo4j.graphdb.Direction.INCOMING;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;

@NodeEntity
public class Category {
    
    @GraphId
    Long id;
    
    public String name;
    public String title;
    public String imagePath;

    @Fetch @RelatedTo(type="PART_OF", direction = INCOMING)
    public Iterable<Test> tests;

    public Long getId() {
        return id;
    }
    
}
