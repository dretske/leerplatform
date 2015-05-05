package be.decock.steven.leerplatform.user;

import be.decock.steven.leerplatform.domain.neo4j.Category;
import static be.decock.steven.leerplatform.domain.neo4j.CategoryTestBuilder.aCategory;
import be.decock.steven.leerplatform.domain.neo4j.Exercise;
import static be.decock.steven.leerplatform.domain.neo4j.ExerciseTestBuilder.anExercise;
import be.decock.steven.leerplatform.domain.neo4j.Lesson;
import static be.decock.steven.leerplatform.domain.neo4j.LessonTestBuilder.aLesson;
import be.decock.steven.leerplatform.service.data.CategoryTO;
import be.decock.steven.leerplatform.service.data.ExerciseTO;
import be.decock.steven.leerplatform.service.data.LearningActivityTO;
import be.decock.steven.leerplatform.service.data.LessonTO;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.Test;

public class CategoriesControllerIntegrationTest extends ControllerIntegrationTest {

    private Lesson testdata_lesson;
    private Exercise testdata_exercise;
    private Category testdata_category;
    private Category testdata_category2;

    @Override
    protected void addTestData() {
        testdata_exercise = anExercise()
                .build();
        
        testdata_lesson = aLesson()
                .withPathParam("key1", "value1")
                .withPathParam("key2", "value2")
                .withNextActivity(testdata_exercise)
                .build();
        
        testdata_lesson = getLessonRepository().save(testdata_lesson);
        
        testdata_category = aCategory()
                .withName("category - name")
                .withTitle("category - title")
                .withImagePath("category - imagePath")
                .withStartActivity(testdata_lesson)
                .build();
        testdata_category = getCategoryRepository().save(testdata_category);
        
        testdata_category2 = aCategory()
                .withName("category 2 - name")
                .withTitle("category 2 - title")
                .withImagePath("category 2 - imagePath")
                .build();
        testdata_category2 = getCategoryRepository().save(testdata_category2);
    }
    
    @Test
    public void getCategories() {
        CategoryTO[] categories = 
            getRestTemplate().getForObject("http://localhost:9000/rest/categories", 
                CategoryTO[].class);
        assertThat(categories).hasSize(2);
    }    
    
    @Test
    public void getCategory() {
        CategoryTO category = 
            getRestTemplate().getForObject("http://localhost:9000/rest/categories/" + testdata_category.getId(), 
                CategoryTO.class);
        assertThat(category.name).isEqualTo(testdata_category.getName());
        assertThat(category.title).isEqualTo(testdata_category.getTitle());
        assertThat(category.imagePath).isEqualTo(testdata_category.getImagePath());
    }    
        
    @Test
    public void getLearningActivitiesForCategory() {
        LearningActivityTO[] activities = 
            getRestTemplate().getForObject("http://localhost:9000/rest/categories/" + testdata_category.getId() + "/learningactivities", 
                LearningActivityTO[].class);

        assertThat(activities).hasSize(2);
        
        assertThat(activities[0]).isInstanceOf(LessonTO.class);
        assertThat(activities[1]).isInstanceOf(ExerciseTO.class);
    }
    
}