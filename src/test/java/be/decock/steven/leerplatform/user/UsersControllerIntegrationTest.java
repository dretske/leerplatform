package be.decock.steven.leerplatform.user;

import be.decock.steven.leerplatform.domain.neo4j.Category;
import be.decock.steven.leerplatform.domain.neo4j.TestScore;
import be.decock.steven.leerplatform.domain.neo4j.User;
import be.decock.steven.leerplatform.service.data.UserWithTestScores;
import java.net.URI;
import java.util.List;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.util.Lists.newArrayList;
import org.junit.Test;
import org.springframework.http.ResponseEntity;

public class UsersControllerIntegrationTest extends ControllerIntegrationTest {

    private be.decock.steven.leerplatform.domain.neo4j.Test test;
    private Category category;

    @Override
    public void addTestData() {
        test = new be.decock.steven.leerplatform.domain.neo4j.Test();
            test = getTestRepository().save(test);
        
        category = new Category();
        category.startActivity = test;
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
    public void addTestScore() {
        User user = getUserRepository().save(createUser("Wies"));
        
        commitTransaction();
        
        ResponseEntity<UserWithTestScores> userWithTestScoresResponse = getRestTemplate().postForEntity(
                "http://localhost:9000/rest/users/" + user.getId() + "/addtestscore?testId=" + test.getId() + "&score=8", 
                "", 
                UserWithTestScores.class);

        startTransaction();
        
        this.test = getTestRepository().findOne(this.test.getId());
        List<TestScore> testScores = newArrayList(test.scores);
        assertThat(testScores).hasSize(1);
        assertThat(testScores.get(0).score).isEqualTo(8);
    }

    private User createUser(String name) {
        final User user = new User();
        user.name = name;
        return user;
    }
    
}