package be.decock.steven.leerplatform.user;

import be.decock.steven.leerplatform.domain.neo4j.Category;
import be.decock.steven.leerplatform.domain.neo4j.Lesson;
import static org.assertj.core.api.Assertions.assertThat;
import org.junit.Test;
import org.springframework.http.ResponseEntity;

public class CategoriesControllerIntegrationTest extends ControllerIntegrationTest {

    private Lesson testdata_lesson;
    private Category testdata_category;

    @Override
    protected void addTestData() {
        testdata_lesson = new Lesson();
        
        testdata_lesson = getLessonRepository().save(testdata_lesson);
        
        testdata_category = new Category();
        testdata_category.name = "category - name";
        testdata_category.title = "category - title";
        testdata_category.imagePath = "category - imagePath";
        testdata_category.imagePath = "category - imagePath";
        testdata_category.startActivity = testdata_lesson;
        testdata_category = getCategoryRepository().save(testdata_category);
    }
    
    @Test
    public void getCategory() {
        String responseAsString = 
            getRestTemplate().getForObject("http://localhost:9000/rest/categories/" + testdata_category.getId(), 
                String.class);
        
        System.out.println(responseAsString);
        
        Category category = 
            getRestTemplate().getForObject("http://localhost:9000/rest/categories/" + testdata_category.getId(), 
                Category.class);
        assertThat(category.name).isEqualTo(testdata_category.name);
    }
    
}