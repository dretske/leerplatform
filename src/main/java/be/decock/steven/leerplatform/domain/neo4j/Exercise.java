package be.decock.steven.leerplatform.domain.neo4j;

import static be.decock.steven.leerplatform.domain.neo4j.LearningActivity.LearningActivityType.TEST;
import static org.neo4j.graphdb.Direction.INCOMING;
import org.springframework.data.neo4j.annotation.RelatedToVia;

public class Exercise extends LearningActivity {
    
    private float passPercentage = 0.7f;
    private float oneStarPercentage = 0.8f;
    private float twoStarPercentage = 0.9f;
    private float threeStarPercentage = 1f;

    @RelatedToVia(type = "FINISHED", direction = INCOMING)
    private Iterable<Score> scores;

    @Override
    public LearningActivityType getType() {
        return TEST;
    }

    public Iterable<Score> getScores() {
        return scores;
    }

    public void setPassPercentage(float passPercentage) {
        this.passPercentage = passPercentage;
    }

    public float getPassPercentage() {
        return passPercentage;
    }

    public void setOneStarPercentage(float oneStarPercentage) {
        this.oneStarPercentage = oneStarPercentage;
    }
    
    public float getOneStarPercentage() {
        return oneStarPercentage;
    }

    public void setTwoStarPercentage(float twoStarPercentage) {
        this.twoStarPercentage = twoStarPercentage;
    }

     public float getTwoStarPercentage() {
        return twoStarPercentage;
    }

    public void setThreeStarPercentage(float threeStarPercentage) {
        this.threeStarPercentage = threeStarPercentage;
    }

    public float getThreeStarPercentage() {
        return threeStarPercentage;
    }
    
}
