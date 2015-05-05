package be.decock.steven.leerplatform.service.data;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.io.IOException;
import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.util.Lists.newArrayList;
import org.junit.Test;

public class LearningActivityTOJsonMarshallingTest {
    
    @Test
    public void marshalAndUnmarshalLesson() throws JsonProcessingException, IOException {
        LessonTO lesson = new LessonTO();
        lesson.title = "lesson title";
        
        ObjectMapper objectMapper = new ObjectMapper();
        String lessonString = objectMapper.writeValueAsString(lesson);
        
        final LearningActivityTO unmarshalled = objectMapper.readValue(lessonString, LearningActivityTO.class);

        assertThat(unmarshalled).isInstanceOf(LessonTO.class);
    }
    
    @Test
    public void marshalAndUnmarshalLearningActivityTOList() throws JsonProcessingException, IOException {
        LessonTO lesson = new LessonTO();
        lesson.title = "lesson title";

        ExerciseTO exercise = new ExerciseTO();
        exercise.title = "exercise title";
        
        LearningActivityTOList activities = new LearningActivityTOArrayList(newArrayList(lesson, exercise));
        
        ObjectMapper objectMapper = new ObjectMapper();
        String activitiesString = objectMapper.writeValueAsString(activities);
        
        final Iterable<LearningActivityTO> unmarshalled = objectMapper.readValue(activitiesString, Iterable.class);

        assertThat(unmarshalled).isInstanceOf(Iterable.class);
    }
    
}
