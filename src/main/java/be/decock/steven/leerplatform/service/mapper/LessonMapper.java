package be.decock.steven.leerplatform.service.mapper;

import be.decock.steven.leerplatform.domain.neo4j.Lesson;
import be.decock.steven.leerplatform.service.data.LessonTO;
import org.springframework.stereotype.Component;

@Component
public class LessonMapper extends BaseLearningActivityMapper<Lesson, LessonTO> {

    @Override
    protected Lesson createDomainInstance() {
        return new Lesson();
    }

    @Override
    protected LessonTO createTOInstance() {
        return new LessonTO();
    }
    
}
