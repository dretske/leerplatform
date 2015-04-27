package be.decock.steven.leerplatform.domain.neo4j;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import java.io.IOException;
import static java.util.Collections.unmodifiableMap;
import java.util.HashMap;
import java.util.Map;
import static jersey.repackaged.com.google.common.base.Throwables.propagate;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.neo4j.graphdb.Direction;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;

@NodeEntity
@TypeAlias("LearningActivity")
@JsonTypeInfo(use=JsonTypeInfo.Id.CLASS, include=JsonTypeInfo.As.PROPERTY, property="@class")
public abstract class LearningActivity {

    @GraphId
    Long id;
    public String title;
    public String subTitle;
    public String path;
    public String pathParamsAsJSON;
    
    @RelatedTo(type="NEXT", direction = Direction.OUTGOING)
    public LearningActivity nextActivity;
    
    public Long getId() {
        return id;
    }
    
    public Map<String, String> getPathParams() {
        Map<String,String> map = new HashMap<>();
        if (pathParamsAsJSON == null) {
            return map;
        }
	ObjectMapper mapper = new ObjectMapper();
 	try {
            map = mapper.readValue(pathParamsAsJSON, 
                new TypeReference<HashMap<String,String>>(){});
	} catch (Exception e) {
            throw propagate(e);
	}
        return unmodifiableMap(map);
    }
    
    public void setPathParams(Map<String,String> pathParams) {
        ObjectMapper mapper = new ObjectMapper();
 	try {
            pathParamsAsJSON = mapper.writeValueAsString(pathParams);
        } catch(IOException e) {
            throw propagate(e);
        }
    }

}
