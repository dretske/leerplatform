package be.decock.steven.leerplatform.domain.neo4j;

import java.util.Date;
import org.springframework.data.neo4j.annotation.EndNode;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.RelationshipEntity;
import org.springframework.data.neo4j.annotation.StartNode;

@RelationshipEntity(type="FINISHED_TEST")
public class TestScore {
    
    @GraphId
    Long id;

    @StartNode 
    User user;
    
    @EndNode
    Test test;
    
    public int score;
    public boolean passed;
    public Date date;

    TestScore() {
    }

    public TestScore(User user, Test test, int score, boolean passed) {
        this.user = user;
        this.test = test;
        this.score = score;
        this.passed = passed;
        this.date = new Date();
    }
    
}
