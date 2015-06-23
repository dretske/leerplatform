package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.neo4j.Exercise;
import static be.decock.steven.leerplatform.domain.neo4j.ExerciseTestBuilder.anExercise;
import be.decock.steven.leerplatform.domain.neo4j.Score;
import be.decock.steven.leerplatform.domain.neo4j.User;

import static be.decock.steven.leerplatform.domain.neo4j.Score.ScoreBuilder.aScore;
import static be.decock.steven.leerplatform.domain.neo4j.UserTestBuilder.aUser;
import be.decock.steven.leerplatform.service.data.ExerciseTO;
import java.util.Date;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.Test;

public class ExercisesControllerIntegrationTest extends ControllerIntegrationTest {

    private User user1, user2;
    private Exercise exercise1, exercise2;

    @Override
    protected void addTestData() {
        user1 = aUser().withName("user1").build();
        user2 = aUser().withName("user2").build();
        getUserRepository().save(user1);
        getUserRepository().save(user2);
        
        exercise1 = anExercise()
                .withTitle("exercise 1")
                .build();
        exercise2 = anExercise()
                .withTitle("exercise 2")
                .build();
        
        exercise1 = getExerciseRepository().save(exercise1);
        exercise2 = getExerciseRepository().save(exercise2);
        
        Score user1_exercise1_score1 = aScore().withUser(user1).withExercise(exercise1).withScore(5).build();
        Score user1_exercise1_score2 = aScore().withUser(user1).withExercise(exercise1).withScore(8).withHighscore(true).build();
        Score user1_exercise1_score3 = aScore().withUser(user1).withExercise(exercise1).withScore(3).build();
        Score user1_exercise2_score1 = aScore().withUser(user1).withExercise(exercise2).withScore(7).withHighscore(true).build();
        Score user1_exercise2_score2 = aScore().withUser(user1).withExercise(exercise2).withScore(6).build();

        Score user2_exercise1_score1 = aScore().withUser(user2).withExercise(exercise1).withScore(4).build();
        Score user2_exercise1_score2 = aScore().withUser(user2).withExercise(exercise1).withScore(7).withHighscore(true).build();
        Score user2_exercise2_score1 = aScore().withUser(user2).withExercise(exercise2).withScore(5).build();
        Score user2_exercise2_score2 = aScore().withUser(user2).withExercise(exercise2).withScore(9).withHighscore(true).build();
        
        getNeo4jTemplate().save(user1_exercise1_score1);
        getNeo4jTemplate().save(user1_exercise1_score2);
        getNeo4jTemplate().save(user1_exercise1_score3);
        getNeo4jTemplate().save(user1_exercise2_score1);
        getNeo4jTemplate().save(user1_exercise2_score2);
        getNeo4jTemplate().save(user2_exercise1_score1);
        getNeo4jTemplate().save(user2_exercise1_score2);
        getNeo4jTemplate().save(user2_exercise2_score1);
        getNeo4jTemplate().save(user2_exercise2_score2);
    }
    
    @Test
    public void getExercise() {
        ExerciseTO exercise = 
            getRestTemplate().getForObject("http://localhost:9000/rest/exercises/" + exercise1.getId(), 
                ExerciseTO.class);
        
        assertThat(exercise.title).isEqualTo(exercise1.getTitle());
        assertThat(exercise.subTitle).isEqualTo(exercise1.getSubTitle());
        assertThat(exercise.passPercentage).isEqualTo(exercise1.getPassPercentage());
        assertThat(exercise.oneStarPercentage).isEqualTo(exercise1.getOneStarPercentage());
        assertThat(exercise.twoStarPercentage).isEqualTo(exercise1.getTwoStarPercentage());
        assertThat(exercise.threeStarPercentage).isEqualTo(exercise1.getThreeStarPercentage());
    }
    
}