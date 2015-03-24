package be.decock.steven.leerplatform.domain;

import java.util.Date;
import java.util.List;
import static org.assertj.core.util.Lists.newArrayList;

public class TestScores {
    
    private int maxScore;
    private List<TestScore> scores = newArrayList();
    
    public TestScores() {
    }

    public int getMaxScore() {
        return maxScore;
    }

    public List<TestScore> getScores() {
        return scores;
    }
    
    public void addScore(int score) {
        if (score > maxScore) {
            maxScore = score;
        }
        scores.add(new TestScore(score, new Date()));
    }
    
}
