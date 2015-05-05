package be.decock.steven.leerplatform.service.mapper;

import be.decock.steven.leerplatform.domain.neo4j.Score;
import be.decock.steven.leerplatform.service.data.ScoreTO;
import org.springframework.stereotype.Component;

@Component
public class ScoreMapper implements Mapper<Score, ScoreTO>{

    @Override
    public ScoreTO mapToTO(Score score) {
        ScoreTO to = new ScoreTO();
        
        to.id = score.getId();
        to.exerciseId = score.getExercise().getId();
        to.score = score.getScore();
        to.passed = score.isPassed();
        to.date = score.getDate();
        to.userId = score.getUser().getId();
        
        return to;
    }

    @Override
    public Score mapToDomain(ScoreTO to) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
