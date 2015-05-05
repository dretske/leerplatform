package be.decock.steven.leerplatform.domain.neo4j;

import static be.decock.steven.leerplatform.config.Beans.getBean;
import com.fasterxml.jackson.annotation.JsonTypeInfo;
import java.io.IOException;
import java.util.ArrayList;
import static java.util.Collections.EMPTY_LIST;
import static java.util.Collections.unmodifiableMap;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import static jersey.repackaged.com.google.common.base.Throwables.propagate;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.type.TypeReference;
import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.springframework.data.neo4j.support.Neo4jTemplate;

@NodeEntity
public abstract class LearningActivity {

    @GraphId
    Long id;
    private String title;
    private String subTitle;
    private String path;
    private String pathParamsAsJSON;
    
    @RelatedTo(type="NEXT", direction = Direction.OUTGOING)
    private LearningActivity nextActivity;
    
    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public String getPathParamsAsJSON() {
        return pathParamsAsJSON;
    }

    public void setPathParamsAsJSON(String pathParamsAsJSON) {
        this.pathParamsAsJSON = pathParamsAsJSON;
    }

    public LearningActivity getNextActivity() {
        return nextActivity;
    }

    public void setNextActivity(LearningActivity nextActivity) {
        this.nextActivity = nextActivity;
    }
    
    public abstract LearningActivityType getType();
    
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

    public List<LearningActivity> getActivities() {
        getBean(Neo4jTemplate.class).fetch(nextActivity);
        
        if (nextActivity != null) {
            List<LearningActivity> result = new ArrayList<>();
            result.add(nextActivity);
            result.addAll(nextActivity.getActivities());
            return result;
        } else {
            return EMPTY_LIST;
        }
    }
    
    public static enum LearningActivityType {
        
        LESSON, TEST;
        
    }

}
