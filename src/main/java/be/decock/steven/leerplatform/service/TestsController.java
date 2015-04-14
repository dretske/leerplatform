package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.domain.neo4j.Test;
import be.decock.steven.leerplatform.repository.CategoryRepository;
import be.decock.steven.leerplatform.repository.TestRepository;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/tests")
public class TestsController {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private TestRepository testRepository;
    
    @RequestMapping(method = GET, produces = "application/json")
    public Iterable<Test> testsForCategory(@RequestParam("categoryId") Long categoryId) {
        return categoryRepository.findOne(categoryId).tests;
    }
    
    @RequestMapping(value = "/{testId}", method = GET, produces = "application/json")
    public Test test(@PathVariable Long testId) {
        return testRepository.findOne(testId);
    }
    
}
