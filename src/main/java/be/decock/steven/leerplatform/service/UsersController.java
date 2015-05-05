package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.neo4j.Exercise;
import be.decock.steven.leerplatform.domain.neo4j.Score;
import be.decock.steven.leerplatform.domain.neo4j.User;
import be.decock.steven.leerplatform.repository.ExerciseRepository;
import be.decock.steven.leerplatform.repository.UserRepository;
import be.decock.steven.leerplatform.service.data.UserTO;
import be.decock.steven.leerplatform.service.mapper.ScoreMapper;
import be.decock.steven.leerplatform.service.mapper.UserMapper;
import com.google.common.collect.Lists;
import static com.google.common.collect.Lists.newArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import javax.inject.Inject;
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
    
    @Inject
    private Neo4jTemplate template;
    
    @Inject
    private UserRepository userRepository;
    
    @Inject
    private ExerciseRepository exerciseRepository;
    
    @Inject
    private UserMapper userMapper;
    
    @Inject
    private ScoreMapper scoreMapper;
    
    @RequestMapping(method = GET, produces = "application/json")
    public Iterable<UserTO> users() {
        Iterable<User> result = userRepository.findAll();
        return userMapper.mapToTO(result);
    }
    
    @RequestMapping(value = "/{userId}", method = GET, produces = "application/json")
    public UserTO user(@PathVariable Long userId) {
        Map<String, Object> params = new HashMap<>();
        params.put("userId", userId);
        
        User user = userRepository.findOne(userId);
        
        UserTO userTO = userMapper.mapToTO(user);
        userTO.maxScores = scoreMapper.mapToTO(newArrayList(maxScoresForUser(user)));
                
        return userTO;
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
    
    @RequestMapping(value = "/{userId}/addexercisescore", method = POST)
    public UserTO addExerciseScore(
            @PathVariable("userId") Long userId, 
            @RequestParam("exerciseId") Long exerciseId, 
            @RequestParam("score") int score) {
        
        User user = userRepository.findOne(userId);
        Exercise exercise = exerciseRepository.findOne(exerciseId);
        
        Score newScore = new Score(user, exercise, score, score > exercise.getPassPercentage());

        template.save(newScore);
        
        return user(userId);
    }
    
    private List<Score> maxScoresForUser(User user) {
        List<ExerciseRepository.MaxScore> maxScores = 
                newArrayList(exerciseRepository.findMaxScoresForUser(user));
        
        return maxScores.stream()
            .map(maxScore -> maxScore.getScore())
            .collect(Collectors.toList());
    }
    
}
