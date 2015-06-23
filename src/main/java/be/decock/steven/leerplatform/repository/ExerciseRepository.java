package be.decock.steven.leerplatform.repository;

import be.decock.steven.leerplatform.domain.neo4j.Exercise;
import be.decock.steven.leerplatform.domain.neo4j.Score;
import be.decock.steven.leerplatform.domain.neo4j.User;
import org.springframework.data.neo4j.annotation.Query;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface ExerciseRepository extends GraphRepository<Exercise> {
    
    @Query("start user=node({0}) " + 
            "match (user)-[score:FINISHED]-(exercise) " +
            "where score.highscore  " +
            "return score")
    Iterable<Score> findHighScoresForUser(User user);

}
