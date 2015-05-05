package be.decock.steven.leerplatform.user;

import be.decock.steven.leerplatform.domain.neo4j.Category;
import static be.decock.steven.leerplatform.domain.neo4j.CategoryTestBuilder.aCategory;
import static be.decock.steven.leerplatform.domain.neo4j.ExerciseTestBuilder.anExercise;
import be.decock.steven.leerplatform.domain.neo4j.Score;
import be.decock.steven.leerplatform.domain.neo4j.User;
import be.decock.steven.leerplatform.service.data.UserTO;
import java.net.URI;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.util.Lists.newArrayList;
import org.junit.Test;
import org.springframework.http.ResponseEntity;

public class UsersControllerIntegrationTest extends ControllerIntegrationTest {

    private be.decock.steven.leerplatform.domain.neo4j.Exercise exercise;
    private Category category;

    @Override
    public void addTestData() {
        exercise = anExercise().build();
        exercise = getExerciseRepository().save(exercise);
        
        category = aCategory()
                .withStartActivity(exercise)
                .build();
        category = getCategoryRepository().save(category);
    }
    
    @Test
    public void createAndGetUsers() {
        URI user1Location = getRestTemplate().postForLocation(
                "http://localhost:9000/rest/users", createUser("Wies"));
        URI user2Location = getRestTemplate().postForLocation(
                "http://localhost:9000/rest/users", createUser("Aster"));
        
        ResponseEntity<User[]> entity = 
            getRestTemplate().getForEntity("http://localhost:9000/rest/users", 
                    User[].class);

        assertThat(entity.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(entity.getBody().length).isEqualTo(2);
    }
    
    @Test
    public void addScore() {
        User user = getUserRepository().save(createUser("Wies"));
        
        commitTransaction();
        
        ResponseEntity<UserTO> userResponse = 
            getRestTemplate().postForEntity("http://localhost:9000/rest/users/" + user.getId() + "/addexercisescore?exerciseId=" + exercise.getId() + "&score=8", 
                "", 
                UserTO.class);

        startTransaction();
        
        this.exercise = getExerciseRepository().findOne(this.exercise.getId());
        List<Score> testScores = newArrayList(exercise.getScores());
        assertThat(testScores).hasSize(1);
        assertThat(testScores.get(0).getScore()).isEqualTo(8);
    }
    
    @Test
    public void getUser() {
        User user = getUserRepository().save(createUser("Wies"));
        Score score = new Score(user, exercise, 7, true);
        Score score2 = new Score(user, exercise, 5, false);
        getNeo4jTemplate().save(score);
        getNeo4jTemplate().save(score2);
        
        commitTransaction();
        
        ResponseEntity<UserTO> userResponse = 
            getRestTemplate().getForEntity("http://localhost:9000/rest/users/" + user.getId(), 
                UserTO.class);

        startTransaction();
        
        UserTO userTO = userResponse.getBody();
        
        assertThat(userTO.name).isEqualTo("Wies");
        assertThat(userTO.maxScores).hasSize(2);
    }

    private User createUser(String name) {
        final User user = new User();
        user.setName(name);
        return user;
    }
    
}