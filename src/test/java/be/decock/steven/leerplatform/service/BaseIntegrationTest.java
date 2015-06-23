package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.Application;
import be.decock.steven.leerplatform.repository.CategoryRepository;
import be.decock.steven.leerplatform.repository.ExerciseRepository;
import be.decock.steven.leerplatform.repository.LessonRepository;
import be.decock.steven.leerplatform.repository.ScoreRepository;
import be.decock.steven.leerplatform.repository.UserRepository;
import java.util.HashMap;
import javax.inject.Inject;
import org.junit.Before;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.SpringApplicationConfiguration;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.transaction.TestTransaction;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.transaction.annotation.Transactional;

@RunWith(SpringJUnit4ClassRunner.class)
@SpringApplicationConfiguration(classes = Application.class)
@WebAppConfiguration
@ActiveProfiles("EmbeddedNeo4J")
@Transactional
public abstract class BaseIntegrationTest {

    @Inject
    private Neo4jTemplate neo4jTemplate;
        
    @Autowired
    private UserRepository userRepository;
        
    @Autowired
    private ExerciseRepository exerciseRepository;
        
    @Autowired
    private ScoreRepository scoreRepository;
        
    @Autowired
    private LessonRepository lessonRepository;
    
    @Autowired
    private CategoryRepository categoryRepository;
    
    @Before
    public void cleanup() {
        neo4jTemplate.query("MATCH ()-[r]-() DELETE r", new HashMap<>());
        neo4jTemplate.query("MATCH (n) DELETE n", new HashMap<>());
        
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

    protected ExerciseRepository getExerciseRepository() {
        return exerciseRepository;
    }

    public ScoreRepository getScoreRepository() {
        return scoreRepository;
    }

    protected LessonRepository getLessonRepository() {
        return lessonRepository;
    }

    protected CategoryRepository getCategoryRepository() {
        return categoryRepository;
    }

    protected Neo4jTemplate getNeo4jTemplate() {
        return neo4jTemplate;
    }

}
