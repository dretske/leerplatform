package be.decock.steven.leerplatform.domain.neo4j;

import java.util.Date;
import org.springframework.data.neo4j.annotation.EndNode;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.RelationshipEntity;
import org.springframework.data.neo4j.annotation.StartNode;

@RelationshipEntity(type="FINISHED")
public class Score {
    
    @GraphId
    Long id;

    @StartNode 
    private User user;
    
    @EndNode
    private Exercise exercise;
    
    private int score;
    private boolean passed;
    private Date date;

    Score() {
    }

    public Score(User user, Exercise exercise, int score, boolean passed) {
        this.user = user;
        this.exercise = exercise;
        this.score = score;
        this.passed = passed;
        this.date = new Date();
    }

    public Long getId() {
        return id;
    }
    
    public User getUser() {
        return user;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public int getScore() {
        return score;
    }

    public boolean isPassed() {
        return passed;
    }

    public Date getDate() {
        return date;
    }
    
}
