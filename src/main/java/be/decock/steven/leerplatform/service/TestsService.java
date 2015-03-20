package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.Test;
import static be.decock.steven.leerplatform.domain.Test.TestBuilder.aTest;
import static com.google.common.collect.Lists.newArrayList;
import static com.google.common.collect.Maps.newHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Stream;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import org.springframework.stereotype.Component;

@Path("/tests")
@Component
public class TestsService {
    
    private static final Map<String, List<Test>> testsForCategories = newHashMap();
    private static final Map<Long, Test> tests = newHashMap();
    
    static {
        List<Test> mathTests = newArrayList(aTest()
                        .withTitle("Optellen")
                        .withSubTitle("1 tot 3")
                        .withPath("math")
                        .withPathParam("max", 3)
                        .withPathParam("graphical", "true")
                        .withPathParam("style", "apple")
                        .withPathParam("subtraction", "false")
                        .build(),
                aTest()
                        .withTitle("Optellen en aftrekken")
                        .withSubTitle("1 tot 3")
                        .withPath("math")
                        .withPathParam("max", 3)
                        .withPathParam("graphical", "true")
                        .withPathParam("style", "ijsjes")
                        .withPathParam("subtraction", "true")
                        .build(),
                aTest()
                        .withTitle("Optellen en aftrekken")
                        .withSubTitle("1 tot 3")
                        .withPath("math")
                        .withPathParam("max", 3)
                        .withPathParam("withoutZero", "true")
                        .withPathParam("subtraction", "true")
                        .build(),
                aTest()
                        .withTitle("Optellen en aftrekken")
                        .withSubTitle("0 tot 5")
                        .withPath("math")
                        .withPathParam("max", 5)
                        .withPathParam("withoutZero", "false")
                        .withPathParam("subtraction", "true")
                        .build(),
                aTest()
                        .withTitle("Optellen en aftrekken")
                        .withSubTitle("0 tot 8")
                        .withPath("math")
                        .withPathParam("max", 8)
                        .withPathParam("withoutZero", "false")
                        .withPathParam("subtraction", "true")
                        .build()
        );
        List<Test> readingTests = newArrayList(aTest()
                        .withTitle("Juist of Fout")
                        .withSubTitle("Makkelijk")
                        .withPath("reading")
                    .build()
        );
        List<Test> writingTests = newArrayList(aTest()
                        .withTitle("Schrijven")
                        .withSubTitle("Woordjes 1")
                        .withPath("writing")
                        .withPathParam("numberOfLettersKnown", "true")
                        .build(),
                aTest()
                        .withTitle("Schrijven")
                        .withSubTitle("Woordjes 2")
                        .withPath("writing")
                        .withPathParam("numberOfLettersKnown", "false")
                        .build()
        );
        testsForCategories.put("math", mathTests);
        testsForCategories.put("reading", readingTests);
        testsForCategories.put("writing", writingTests);
        
        Stream<Test> allTests = 
                testsForCategories.values().stream()
                    .flatMap((testList) -> testList.stream());
        
        allTests.forEach(test -> tests.put(test.getId(), test));
    }
    
    @GET
    @Produces("application/json")
    public Test[] testsForCategory(@QueryParam("categoryId") String categoryId) {
        return testsForCategories.get(categoryId).toArray(new Test[testsForCategories.get(categoryId).size()]);
    }
    
    @GET
    @Path("/{testId}")
    @Produces("application/json")
    public Test test(@PathParam("testId") long testId) {
        return tests.get(testId);
    }
    
}
