package be.decock.steven.leerplatform.domain;

import java.util.Map;
import static jersey.repackaged.com.google.common.collect.Maps.newHashMap;
import org.springframework.data.annotation.Id;

public class User {
 
    @Id
    private String id;
    private String name;
    private Map<String, TestScores> testScoresMap = newHashMap();
    
    public User() {
    }
    
    public User(String name) {
        this.name = name;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    
    public Map<String, TestScores> getTestScores() {
        return testScoresMap;
    }

    public void addTestScore(String testId, int score) {
        TestScores testScores;
        if (!testScoresMap.containsKey(testId)) {
            testScores = new TestScores();
            testScoresMap.put(testId, testScores);
        } else {
            testScores = testScoresMap.get(testId);
        }
        testScores.addScore(score);
    }
    
}
