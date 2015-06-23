package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.repository.LessonRepository;
import be.decock.steven.leerplatform.service.data.LessonTO;
import be.decock.steven.leerplatform.service.mapper.LessonMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/lessons")
@Transactional
public class LessonsController {

    @Autowired
    private LessonMapper lessonMapper;

    @Autowired
    private LessonRepository lessonRepository;
    
    @RequestMapping(value = "/{lessonId}", method = GET, produces = "application/json")
    public LessonTO exercise(@PathVariable Long lessonId) {
        return lessonMapper.mapToTO(lessonRepository.findOne(lessonId));
    }
    
}
