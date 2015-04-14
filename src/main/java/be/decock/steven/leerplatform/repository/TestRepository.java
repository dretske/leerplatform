package be.decock.steven.leerplatform.repository;

import be.decock.steven.leerplatform.domain.neo4j.Test;
import be.decock.steven.leerplatform.domain.neo4j.User;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.annotation.QueryResult;
import org.springframework.data.neo4j.annotation.ResultColumn;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface TestRepository extends GraphRepository<Test> {
    
    @Query("start user=node({0}) " + 
            "match (user)-[r:FINISHED_TEST]-(test)" + 
            "return test, MAX(r.score)")
    Iterable<MaxTestScore> findMaxTestScoresForUser(User user); 
        
    @QueryResult
    public static class MaxTestScore {
        
        @ResultColumn("test")
        private Test test;

        @ResultColumn("MAX(r.score)")
        private Integer maxScore;

        public Test getTest() {
            return test;
        }

        public void setTest(Test test) {
            this.test = test;
        }
        
        public Integer getMaxScore() {
            return maxScore;
        }

        public void setMaxScore(Integer maxScore) {
            this.maxScore = maxScore;
        }
        
    }

}
