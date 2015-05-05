package be.decock.steven.leerplatform.user;

import be.decock.steven.leerplatform.domain.neo4j.Category;
import be.decock.steven.leerplatform.domain.neo4j.Exercise;
import be.decock.steven.leerplatform.domain.neo4j.ExerciseTestBuilder;
import static be.decock.steven.leerplatform.domain.neo4j.ExerciseTestBuilder.anExercise;
import be.decock.steven.leerplatform.service.data.CategoryTO;
import be.decock.steven.leerplatform.service.data.ExerciseTO;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.Test;

public class ExercisesControllerIntegrationTest extends ControllerIntegrationTest {

    private Exercise testdata_exercise;

    @Override
    protected void addTestData() {
        testdata_exercise = anExercise().build();
        
        testdata_exercise = getExerciseRepository().save(testdata_exercise);
    }
    
    @Test
    public void getExercise() {
        ExerciseTO exercise = 
            getRestTemplate().getForObject("http://localhost:9000/rest/exercises/" + testdata_exercise.getId(), 
                ExerciseTO.class);
        
        assertThat(exercise.title).isEqualTo(testdata_exercise.getTitle());
        assertThat(exercise.subTitle).isEqualTo(testdata_exercise.getSubTitle());
        assertThat(exercise.passPercentage).isEqualTo(testdata_exercise.getPassPercentage());
        assertThat(exercise.oneStarPercentage).isEqualTo(testdata_exercise.getOneStarPercentage());
        assertThat(exercise.twoStarPercentage).isEqualTo(testdata_exercise.getTwoStarPercentage());
        assertThat(exercise.threeStarPercentage).isEqualTo(testdata_exercise.getThreeStarPercentage());
    }
    
}