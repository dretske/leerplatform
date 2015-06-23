package be.decock.steven.leerplatform.repository;

import be.decock.steven.leerplatform.domain.neo4j.Exercise;
import static be.decock.steven.leerplatform.domain.neo4j.ExerciseTestBuilder.anExercise;
import be.decock.steven.leerplatform.domain.neo4j.Score;
import static be.decock.steven.leerplatform.domain.neo4j.Score.ScoreBuilder.aScore;
import be.decock.steven.leerplatform.domain.neo4j.User;
import static be.decock.steven.leerplatform.domain.neo4j.UserTestBuilder.aUser;
import be.decock.steven.leerplatform.service.BaseIntegrationTest;
import java.util.Date;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.Test;

public class ScoreRepositoryTest extends BaseIntegrationTest {

    private User user;
    private Exercise exercise;

    @Override
    protected void addTestData() {
        user = aUser().withName("user").build();
        getUserRepository().save(user);
        
        exercise = anExercise()
                .withTitle("exercise")
                .build();
        
        Date now = new Date();
        
        Score not_highscore = aScore()
                .withUser(user)
                .withExercise(exercise)
                .withScore(6)
                .withHighscore(false)
                .build();
        
        Score highscore = aScore()
                .withUser(user)
                .withExercise(exercise)
                .withScore(8)
                .withHighscore(true)
                .build();
        
        exercise = getExerciseRepository().save(exercise);

        getNeo4jTemplate().save(not_highscore);
        getNeo4jTemplate().save(highscore);
    }
     
    @Test
    public void getHighScoreByUserAndExercise() {
        Score score = getScoreRepository().getHighScoreByUserAndExercise(user, exercise);
        
        assertThat(score).isNotNull();
        assertThat(score.getScore()).isEqualTo(8);
    }
   
}
