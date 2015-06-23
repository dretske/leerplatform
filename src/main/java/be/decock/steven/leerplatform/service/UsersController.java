package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.neo4j.Exercise;
import be.decock.steven.leerplatform.domain.neo4j.Score;
import be.decock.steven.leerplatform.domain.neo4j.User;
import be.decock.steven.leerplatform.repository.ExerciseRepository;
import be.decock.steven.leerplatform.repository.ScoreRepository;
import be.decock.steven.leerplatform.repository.UserRepository;
import be.decock.steven.leerplatform.service.data.UserTO;
import be.decock.steven.leerplatform.service.mapper.ScoreMapper;
import be.decock.steven.leerplatform.service.mapper.UserMapper;
import org.springframework.data.neo4j.support.Neo4jTemplate;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.inject.Inject;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static be.decock.steven.leerplatform.domain.neo4j.Score.ScoreBuilder.aScore;
import static com.google.common.collect.Lists.newArrayList;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import static org.springframework.web.bind.annotation.RequestMethod.POST;

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
    private ScoreRepository scoreRepository;
    
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
        userTO.maxScores = scoreMapper.mapToTO(newArrayList(highScoresForUser(user)));
                
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
        
        Score currentHighScore = scoreRepository.getHighScoreByUserAndExercise(user, exercise);
        Date now = new Date();
        
        boolean isHighscore = currentHighScore == null || score > currentHighScore.getScore();
        if (isHighscore && currentHighScore != null) {
            currentHighScore.setHighscore(false);
            template.save(currentHighScore);
        }
        Score newScore = aScore()
                .withUser(user)
                .withExercise(exercise)
                .withScore(score)
                .withHighscore(isHighscore)
                .build();

        template.save(newScore);

        return user(userId);
    }

    private List<Score> highScoresForUser(User user) {
        return newArrayList(exerciseRepository.findHighScoresForUser(user));
    }

}
