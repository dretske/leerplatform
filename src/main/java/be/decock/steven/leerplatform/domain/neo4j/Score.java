package be.decock.steven.leerplatform.domain.neo4j;

import java.util.Date;
import org.springframework.data.neo4j.annotation.EndNode;
import org.springframework.data.neo4j.annotation.Fetch;
import org.springframework.data.neo4j.annotation.GraphId;
import org.springframework.data.neo4j.annotation.RelationshipEntity;
import org.springframework.data.neo4j.annotation.StartNode;

@RelationshipEntity(type="FINISHED")
public class Score {
    
    @GraphId
    Long id;

    @StartNode 
    private User user;
    
    @Fetch @EndNode
    private Exercise exercise;
    
    private int score;
    private boolean passed;
    private boolean highscore;
    private Date date;

    Score() {
    }

    private Score(User user, Exercise exercise, int score, boolean highscore, Date date) {
        this.user = user;
        this.exercise = exercise;
        this.score = score;
        this.highscore = highscore;
        this.passed = score > exercise.getPassPercentage();
        this.date = date;
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
    
    public boolean isHighscore() {
        return highscore;
    }
    
    public void setHighscore(boolean highscore) {
        this.highscore = highscore;
    }

    public Date getDate() {
        return date;
    }
    
    public static class ScoreBuilder {
        
        private User user;
        private Exercise exercise;
        private int score;
        private boolean highscore = false;
        private Date date = new Date();

        public static ScoreBuilder aScore() {
            return new ScoreBuilder();
        }

        private ScoreBuilder() {
        }
        
        public Score build() {
            return new Score(user, exercise, score, highscore, date);
        }

        public ScoreBuilder withUser(User user) {
            this.user = user;
            return this;
        }

        public ScoreBuilder withExercise(Exercise exercise) {
            this.exercise = exercise;
            return this;
        }

        public ScoreBuilder withScore(int score) {
            this.score = score;
            return this;
        }

        public ScoreBuilder withHighscore(boolean highscore) {
            this.highscore = highscore;
            return this;
        }

    }
    
}
