package be.decock.steven.leerplatform.user;

import be.decock.steven.leerplatform.Application;
import be.decock.steven.leerplatform.repository.CategoryRepository;
import be.decock.steven.leerplatform.repository.LessonRepository;
import be.decock.steven.leerplatform.repository.TestRepository;
import be.decock.steven.leerplatform.repository.UserRepository;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TestTransaction;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@IntegrationTest({"server.port=9000"})
@ActiveProfiles("EmbeddedNeo4J")
@Transactional
public abstract class ControllerIntegrationTest {
 
    
    private final RestTemplate restTemplate = new TestRestTemplate();
        
    @Autowired
    private UserRepository userRepository;
        
    @Autowired
    private TestRepository testRepository;
        
    @Autowired
    private LessonRepository lessonRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;


    protected RestTemplate getRestTemplate() {
        return restTemplate;
    }
    
    @Before
    public void cleanup() {
        userRepository.deleteAll();
        testRepository.deleteAll();
        lessonRepository.deleteAll();
        categoryRepository.deleteAll();
        
        addTestData();
        
        commitTransaction();
        startTransaction();
    }

    protected void commitTransaction() {
        TestTransaction.flagForCommit();
        TestTransaction.end();
    }
    
    protected void startTransaction() {
        TestTransaction.start();
    }
    
    protected abstract void addTestData();

    protected UserRepository getUserRepository() {
        return userRepository;
    }

    protected TestRepository getTestRepository() {
        return testRepository;
    }

    protected LessonRepository getLessonRepository() {
        return lessonRepository;
    }

    protected CategoryRepository getCategoryRepository() {
        return categoryRepository;
    }
    
}
