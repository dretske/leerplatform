package be.decock.steven.leerplatform.repository;

import be.decock.steven.leerplatform.domain.neo4j.Exercise;
import be.decock.steven.leerplatform.domain.neo4j.Score;
import be.decock.steven.leerplatform.domain.neo4j.User;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.annotation.QueryResult;
import org.springframework.data.neo4j.annotation.ResultColumn;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface ExerciseRepository extends GraphRepository<Exercise> {
    
    @Query("start user=node({0}) " + 
            "match (user)-[score:FINISHED]-(exercise)" + 
            "return score, MAX(score.score)")
    Iterable<MaxScore> findMaxScoresForUser(User user); 
        
    @QueryResult
    public static class MaxScore {
        
        @ResultColumn("score")
        private Score score;

        @ResultColumn("MAX(score.score)")
        private Integer maxScore;

        public Score getScore() {
            return score;
        }

        public void setScore(Score score) {
            this.score = score;
        }
        
        public Integer getMaxScore() {
            return maxScore;
        }

        public void setMaxScore(Integer maxScore) {
            this.maxScore = maxScore;
        }
        
    }

}
