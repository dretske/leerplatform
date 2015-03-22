package be.decock.steven.leerplatform.user;

import be.decock.steven.leerplatform.domain.User;
import be.decock.steven.leerplatform.Application;
import be.decock.steven.leerplatform.repository.CategoryRepository;
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
import org.springframework.beans.factory.annotation.Autowired;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest("server.port=9000")
public class UsersServiceTest {

    private final RestTemplate restTemplate = new TestRestTemplate();
    
    @Autowired
    CategoryRepository userRepository;

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
        
        userRepository.deleteAll();
    }
}