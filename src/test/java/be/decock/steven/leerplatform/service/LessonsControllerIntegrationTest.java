package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.neo4j.Lesson;
import static be.decock.steven.leerplatform.domain.neo4j.LessonTestBuilder.aLesson;
import be.decock.steven.leerplatform.service.data.LessonTO;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.Test;

public class LessonsControllerIntegrationTest extends ControllerIntegrationTest {

    private Lesson testdata_lesson;

    @Override
    protected void addTestData() {
        testdata_lesson = aLesson().build();
        
        testdata_lesson = getLessonRepository().save(testdata_lesson);
    }
    
    @Test
    public void getLesson() {
        LessonTO lesson = 
            getRestTemplate().getForObject("http://localhost:9000/rest/lessons/" + testdata_lesson.getId(), 
                LessonTO.class);
        
        assertThat(lesson.title).isEqualTo(testdata_lesson.getTitle());
        assertThat(lesson.subTitle).isEqualTo(testdata_lesson.getSubTitle());
    }
    
}