package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.repository.ExerciseRepository;
import be.decock.steven.leerplatform.service.data.ExerciseTO;
import be.decock.steven.leerplatform.service.mapper.ExerciseMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/exercises")
@Transactional
public class ExercisesController {

    @Autowired
    private ExerciseMapper exerciseMapper;

    @Autowired
    private ExerciseRepository exerciseRepository;
    
    @RequestMapping(value = "/{exerciseId}", method = GET, produces = "application/json")
    public ExerciseTO exercise(@PathVariable Long exerciseId) {
        return exerciseMapper.mapToTO(exerciseRepository.findOne(exerciseId));
    }
    
}
