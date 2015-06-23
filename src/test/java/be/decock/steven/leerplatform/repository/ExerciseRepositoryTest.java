package be.decock.steven.leerplatform.repository;

import be.decock.steven.leerplatform.domain.neo4j.Exercise;
import be.decock.steven.leerplatform.domain.neo4j.Score;
import be.decock.steven.leerplatform.domain.neo4j.User;
import be.decock.steven.leerplatform.service.BaseIntegrationTest;
import org.junit.Test;

import java.util.Date;
import java.util.List;

import static be.decock.steven.leerplatform.domain.neo4j.ExerciseTestBuilder.anExercise;
import static be.decock.steven.leerplatform.domain.neo4j.Score.ScoreBuilder.aScore;
import static be.decock.steven.leerplatform.domain.neo4j.UserTestBuilder.aUser;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.util.Lists.newArrayList;

public class ExerciseRepositoryTest extends BaseIntegrationTest {

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
        
        Score user1_exercise1_score1 = aScore().withUser(user1).withExercise(exercise1).withScore(5).build();
        Score user1_exercise1_score2 = aScore().withUser(user1).withExercise(exercise1).withScore(8).withHighscore(true).build();
        Score user1_exercise1_score3 = aScore().withUser(user1).withExercise(exercise1).withScore(3).build();
        Score user1_exercise2_score1 = aScore().withUser(user1).withExercise(exercise2).withScore(7).withHighscore(true).build();
        Score user1_exercise2_score2 = aScore().withUser(user1).withExercise(exercise2).withScore(6).build();

        Score user2_exercise1_score1 = aScore().withUser(user2).withExercise(exercise1).withScore(4).build();
        Score user2_exercise1_score2 = aScore().withUser(user2).withExercise(exercise1).withScore(7).withHighscore(true).build();
        Score user2_exercise2_score1 = aScore().withUser(user2).withExercise(exercise2).withScore(5).build();
        Score user2_exercise2_score2 = aScore().withUser(user2).withExercise(exercise2).withScore(9).withHighscore(true).build();

        exercise1 = getExerciseRepository().save(exercise1);
        exercise2 = getExerciseRepository().save(exercise2);

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
    public void findHighScoresForUser() {
        List<Score> highScoresForUser = newArrayList(getExerciseRepository().findHighScoresForUser(user1));
        
        highScoresForUser.forEach(highScore -> print(highScore));
        assertThat(highScoresForUser).hasSize(2);
        
        Score highScoreExercise1 = highScoresForUser.stream()
                .filter(highScore -> highScore.getExercise().getTitle().equals("exercise 1"))
                .findFirst().get();
        Score highScoreExercise2 = highScoresForUser.stream()
                .filter(maxScore -> maxScore.getExercise().getTitle().equals("exercise 2"))
                .findFirst().get();
        
        assertThat(highScoreExercise1.getScore()).isEqualTo(8);
        assertThat(highScoreExercise2.getScore()).isEqualTo(7);
    }

    private void print(Score highScore) {
        System.out.print("HighScore is " + highScore.getScore());
        System.out.println(" for exercise " + highScore.getExercise().getTitle());
    }
   
}
