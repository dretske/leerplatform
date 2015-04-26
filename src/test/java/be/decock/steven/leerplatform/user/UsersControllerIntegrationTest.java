package be.decock.steven.leerplatform.user;

import be.decock.steven.leerplatform.Application;
import be.decock.steven.leerplatform.domain.neo4j.Category;
import be.decock.steven.leerplatform.domain.neo4j.TestScore;
import be.decock.steven.leerplatform.domain.neo4j.User;
import be.decock.steven.leerplatform.repository.CategoryRepository;
import be.decock.steven.leerplatform.repository.TestRepository;
import be.decock.steven.leerplatform.repository.UserRepository;
import be.decock.steven.leerplatform.service.data.UserWithTestScores;
import java.net.URI;
import java.util.List;
import static jersey.repackaged.com.google.common.collect.Sets.newHashSet;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.util.Lists.newArrayList;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TestTransaction;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest({"server.port=9000", "spring.data.mongodb.uri=mongodb://localhost/test"})
@ActiveProfiles("EmbeddedNeo4J")
@Transactional
public class UsersControllerIntegrationTest {

    private final RestTemplate restTemplate = new TestRestTemplate();

    private be.decock.steven.leerplatform.domain.neo4j.Test test;
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

        test = new be.decock.steven.leerplatform.domain.neo4j.Test();
        test = testRepository.save(test);
        
        category = new Category();
        category.tests = newHashSet(test);
        category = categoryRepository.save(category);

    }
    
    @Test
    public void health() {
        URI user1Location = restTemplate.postForLocation(
                "http://localhost:9000/rest/users", createUser("Wies"));
        URI user2Location = restTemplate.postForLocation(
                "http://localhost:9000/rest/users", createUser("Aster"));
        
        ResponseEntity<User[]> entity = 
                restTemplate.getForEntity("http://localhost:9000/rest/users", User[].class);

        assertThat(entity.getStatusCode().is2xxSuccessful()).isTrue();
        assertThat(entity.getBody().length).isEqualTo(2);
    }
    
    @Test
    public void addTestScore() {
        User user = userRepository.save(createUser("Wies"));
        
        TestTransaction.flagForCommit();
        TestTransaction.end();
        
        ResponseEntity<UserWithTestScores> userWithTestScoresResponse = restTemplate.postForEntity(
                "http://localhost:9000/rest/users/" + user.getId() + "/addtestscore?testId=" + test.getId() + "&score=8", 
                "", 
                UserWithTestScores.class);
        
        TestTransaction.start();
        
        this.test = testRepository.findOne(this.test.getId());
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