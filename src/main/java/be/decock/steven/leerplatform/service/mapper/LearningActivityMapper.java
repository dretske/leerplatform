package be.decock.steven.leerplatform.service.mapper;

import be.decock.steven.leerplatform.domain.neo4j.Exercise;
import be.decock.steven.leerplatform.domain.neo4j.LearningActivity;
import be.decock.steven.leerplatform.domain.neo4j.Lesson;
import be.decock.steven.leerplatform.service.data.LearningActivityTO;
import javax.inject.Inject;
import org.springframework.stereotype.Component;

@Component
public class LearningActivityMapper implements Mapper<LearningActivity, LearningActivityTO> {

    @Inject
    private LessonMapper lessonMapper;
    @Inject
    private ExerciseMapper exerciseMapper;

    @Override
    public LearningActivityTO mapToTO(LearningActivity from) {
        if (from instanceof Lesson) {
            return lessonMapper.mapToTO((Lesson) from);
        } else if (from instanceof Exercise) {
            return exerciseMapper.mapToTO((Exercise) from);
        }
        throw new IllegalArgumentException("Could not map object of type " + from.getClass().getName());
    }

    @Override
    public LearningActivity mapToDomain(LearningActivityTO to) {
        throw new UnsupportedOperationException("Not supported yet."); //To change body of generated methods, choose Tools | Templates.
    }
    
}
