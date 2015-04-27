package be.decock.steven.leerplatform.domain.neo4j;

import static org.neo4j.graphdb.Direction.INCOMING;
import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.neo4j.annotation.NodeEntity;
import org.springframework.data.neo4j.annotation.RelatedToVia;

@NodeEntity
@TypeAlias("Test")
public class Test extends LearningActivity {
    
    public float passPercentage = 0.7f;
    public float oneStarPercentage = 0.8f;
    public float twoStarPercentage = 0.9f;
    public float threeStarPercentage = 1f;

    @RelatedToVia(type = "FINISHED_TEST", direction = INCOMING)
    public Iterable<TestScore> scores;
    
}
