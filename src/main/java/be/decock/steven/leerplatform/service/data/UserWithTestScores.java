package be.decock.steven.leerplatform.service.data;

import be.decock.steven.leerplatform.domain.neo4j.User;
import be.decock.steven.leerplatform.repository.TestRepository;

public class UserWithTestScores {
    
    private final User user;
    private final Iterable<TestRepository.MaxTestScore> testScores;
    
    public UserWithTestScores(User user, Iterable<TestRepository.MaxTestScore> testScores) {
        this.user = user;
        this.testScores = testScores;
    }

    public Iterable<TestRepository.MaxTestScore> getTestScores() {
        return testScores;
    }

    public Long getId() {
        return user.getId();
    }
    
    public String getName() {
        return user.name;
    }

}
