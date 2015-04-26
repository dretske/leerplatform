package be.decock.steven.leerplatform.domain.neo4j;

import java.util.HashMap;
import java.util.Map;
import static jersey.repackaged.com.google.common.base.Throwables.propagate;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import static org.neo4j.graphdb.Direction.INCOMING;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedToVia;

@NodeEntity
public class Test {
    
    @GraphId
    Long id;
    public String title;
    public String subTitle;
    public String path;
    String pathParams;

    @RelatedToVia(type = "FINISHED_TEST", direction = INCOMING)
    public Iterable<TestScore> scores;
    
    public Category category;

    public Long getId() {
        return id;
    }
    
    public Map<String, String> getPathParams() {
        Map<String,String> map = new HashMap<>();
	ObjectMapper mapper = new ObjectMapper();
 
	try {
            map = mapper.readValue(pathParams, 
                new TypeReference<HashMap<String,String>>(){});

            System.out.println(map);
	} catch (Exception e) {
            throw propagate(e);
	}
        return map;
    }
        
}
