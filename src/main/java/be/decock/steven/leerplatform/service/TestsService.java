package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.Test;
import be.decock.steven.leerplatform.repository.TestRepository;
import java.util.List;
import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.QueryParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Path("/tests")
@Component
public class TestsService {
    
    @Autowired
    private TestRepository testRepository;
    
    @GET
    @Produces("application/json")
    public List<Test> testsForCategory(@QueryParam("categoryId") String categoryId) {
        return testRepository.findByCategoryId(categoryId);
    }
    
    @GET
    @Path("/{testId}")
    @Produces("application/json")
    public Test test(@PathParam("testId") String testId) {
        return testRepository.findOne(testId);
    }
    
}
