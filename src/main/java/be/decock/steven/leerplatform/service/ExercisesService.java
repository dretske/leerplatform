package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.Exercise;
import static be.decock.steven.leerplatform.domain.Exercise.ExerciseBuilder.anExercise;
import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import java.util.List;
import java.util.Map;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import org.springframework.stereotype.Component;

@Path("/exercises")
@Component
public class ExercisesService {
    
    private static final Map<String, List<Exercise>> exercises = newHashMap();
    
    static {
        List<Exercise> rekenenOefeningen = newArrayList(
                anExercise()
                        .withTitle("Optellen")
                        .withSubTitle("1 tot 3")
                        .withPath("rekenen")
                        .withPathParam("max", 3)
                        .withPathParam("graphical", true)
                        .withPathParam("style", "apple")
                        .withPathParam("subtraction", false)
                        .build(),
                anExercise()
                        .withTitle("Optellen en aftrekken")
                        .withSubTitle("1 tot 3")
                        .withPath("rekenen")
                        .withPathParam("max", 3)
                        .withPathParam("graphical", true)
                        .withPathParam("style", "ijsjes")
                        .withPathParam("subtraction", true)
                        .build(),
                anExercise()
                        .withTitle("Optellen en aftrekken")
                        .withSubTitle("1 tot 3")
                        .withPath("rekenen")
                        .withPathParam("max", 3)
                        .withPathParam("withoutZero", true)
                        .withPathParam("subtraction", true)
                        .build(),
                anExercise()
                        .withTitle("Optellen en aftrekken")
                        .withSubTitle("0 tot 5")
                        .withPath("rekenen")
                        .withPathParam("max", 5)
                        .withPathParam("withoutZero", false)
                        .withPathParam("subtraction", true)
                        .build(),
                anExercise()
                        .withTitle("Optellen en aftrekken")
                        .withSubTitle("0 tot 8")
                        .withPath("rekenen")
                        .withPathParam("max", 8)
                        .withPathParam("withoutZero", false)
                        .withPathParam("subtraction", true)
                        .build()
        );
        List<Exercise> lezenOefeningen = newArrayList(
                anExercise()
                        .withTitle("Juist of Fout")
                        .withSubTitle("Makkelijk")
                        .withPath("lezen")
                    .build()
        );
        List<Exercise> schrijvenOefeningen = newArrayList(
                anExercise()
                        .withTitle("Schrijven")
                        .withSubTitle("Woordjes 1")
                        .withPath("schrijven")
                        .withPathParam("aantalLettersGekend", true)
                        .build(),
                anExercise()
                        .withTitle("Schrijven")
                        .withSubTitle("Woordjes 2")
                        .withPath("schrijven")
                        .withPathParam("aantalLettersGekend", false)
                        .build()
        );
        exercises.put("rekenen", rekenenOefeningen);
        exercises.put("lezen", lezenOefeningen);
        exercises.put("schrijven", schrijvenOefeningen);
    }
    
    @GET
    @Produces("application/json")
    public Exercise[] exercisesForCategory(@QueryParam("categoryId") String categoryId) {
        return exercises.get(categoryId).toArray(new Exercise[exercises.size()]);
    }
    
}
