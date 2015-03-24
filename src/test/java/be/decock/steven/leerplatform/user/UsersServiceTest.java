package be.decock.steven.leerplatform.user;

import be.decock.steven.leerplatform.domain.User;
import be.decock.steven.leerplatform.Application;
import be.decock.steven.leerplatform.domain.Category;
import be.decock.steven.leerplatform.repository.CategoryRepository;
import be.decock.steven.leerplatform.repository.TestRepository;
import be.decock.steven.leerplatform.repository.UserRepository;
import java.net.URI;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.web.client.RestTemplate;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.Before;
import org.springframework.beans.factory.annotation.Autowired;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest({"server.port=9000", "spring.data.mongodb.uri=mongodb://localhost/test"})
public class UsersServiceTest {

    private final RestTemplate restTemplate = new TestRestTemplate();

    private be.decock.steven.leerplatform.domain.Test test;
    private Category category;

    @Autowired
    UserRepository userRepository;
    
    @Autowired
    TestRepository testRepository;
    
    @Autowired
    CategoryRepository categoryRepository;

    @Before
    public void cleanup() {
        userRepository.deleteAll();
        testRepository.deleteAll();
        categoryRepository.deleteAll();

        category = new Category();
        category = categoryRepository.save(category);

        test = new be.decock.steven.leerplatform.domain.Test();
        test.setCategoryId(category.getId());
        test = testRepository.save(test);
    }
    
    @Test
    public void health() {
        URI user1Location = restTemplate.postForLocation(
                "http://localhost:9000/rest/users", new User("Wies"));
        URI user2Location = restTemplate.postForLocation(
                "http://localhost:9000/rest/users", new User("Aster"));
        
        ResponseEntity<User[]> entity = 
                restTemplate.getForEntity("http://localhost:9000/rest/users", User[].class);

        assertThat(entity.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(entity.getBody().length).isEqualTo(2);
    }
    
    @Test
    public void addTestScore() {
        User user = userRepository.save(new User("Wies"));
        
        restTemplate.postForLocation(
                "http://localhost:9000/rest/users/" + user.getId() + "/addtestscore?testId=" + test.getId() + "&score=8", "");
        
        user = userRepository.findOne(user.getId());
        assertThat(user.getTestScores().get(test.getId()).getMaxScore()).isEqualTo(8);
        assertThat(user.getTestScores().get(test.getId()).getScores()).hasSize(1);
    }
    
}