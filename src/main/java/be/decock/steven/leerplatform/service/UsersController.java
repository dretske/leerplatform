package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.neo4j.Test;
import be.decock.steven.leerplatform.domain.neo4j.TestScore;
import be.decock.steven.leerplatform.domain.neo4j.User;
import be.decock.steven.leerplatform.repository.TestRepository;
import be.decock.steven.leerplatform.repository.UserRepository;
import be.decock.steven.leerplatform.service.data.UserWithTestScores;
import com.google.common.collect.Lists;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@RequestMapping("/rest/users")
@Transactional
public class UsersController {
    
    @Autowired
    private Neo4jTemplate template;
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private TestRepository testRepository;
    
    @RequestMapping(method = GET, produces = "application/json")
    public List<User> users() {
        Iterable<User> result = userRepository.findAll();
        return Lists.newArrayList(result);
    }
    
    @RequestMapping(value = "/{userId}", method = GET, produces = "application/json")
    public UserWithTestScores user(@PathVariable Long userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        
        User user = userRepository.findOne(userId);
        
        Iterable<TestRepository.MaxTestScore> maxTestScores = 
                testRepository.findMaxTestScoresForUser(user);
                
        return new UserWithTestScores(user, maxTestScores);
    }
    
    @RequestMapping(method = POST, consumes = "application/json")
    public ResponseEntity<?> newUser(@RequestBody User user) {
        User savedUser = userRepository.save(user);
        
        HttpHeaders httpHeaders = new HttpHeaders();
        httpHeaders.setLocation(ServletUriComponentsBuilder
                        .fromCurrentRequest().path("/{id}")
                        .buildAndExpand(savedUser.getId()).toUri());
        return new ResponseEntity<>(null, httpHeaders, HttpStatus.CREATED);
    }
    
    @RequestMapping(value = "/{userId}/addtestscore", method = POST)
    public UserWithTestScores addTestScore(
            @PathVariable("userId") Long userId, 
            @RequestParam("testId") Long testId, 
            @RequestParam("score") int score) {
        
        User user = userRepository.findOne(userId);
        Test test = testRepository.findOne(testId);
        
        TestScore testScore = new TestScore(user, test, score, score > test.passPercentage);

        template.save(testScore);
        
        return user(userId);
    }
    
}
