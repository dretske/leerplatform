package be.decock.steven.leerplatform.domain.neo4j;

import static be.decock.steven.leerplatform.config.Beans.getBean;
import java.util.ArrayList;
import static java.util.Collections.EMPTY_LIST;
import java.util.List;
import org.neo4j.graphdb.Direction;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedTo;
import org.springframework.data.neo4j.support.Neo4jTemplate;

@NodeEntity
public class Category {

    @GraphId
    Long id;

    private String name;
    private String title;
    private String imagePath;
    
    @RelatedTo(type="START", direction = Direction.OUTGOING)
    private LearningActivity startActivity;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getImagePath() {
        return imagePath;
    }

    public void setImagePath(String imagePath) {
        this.imagePath = imagePath;
    }

    public LearningActivity getStartActivity() {
        return startActivity;
    }

    public void setStartActivity(LearningActivity startActivity) {
        this.startActivity = startActivity;
    }
    
    public List<LearningActivity> getActivities() {
        getBean(Neo4jTemplate.class).fetch(startActivity);
        
        if (startActivity != null) {
            List<LearningActivity> result = new ArrayList<>();
            result.add(startActivity);
            result.addAll(startActivity.getActivities());
            return result;
        } else {
            return EMPTY_LIST;
        }
    }
    
}
