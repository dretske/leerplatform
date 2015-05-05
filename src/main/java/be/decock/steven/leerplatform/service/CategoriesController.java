package be.decock.steven.leerplatform.service;

import be.decock.steven.leerplatform.repository.CategoryRepository;
import be.decock.steven.leerplatform.service.data.CategoryTO;
import be.decock.steven.leerplatform.service.data.LearningActivityTOArrayList;
import be.decock.steven.leerplatform.service.data.LearningActivityTOList;
import be.decock.steven.leerplatform.service.mapper.CategoryMapper;
import be.decock.steven.leerplatform.service.mapper.LearningActivityMapper;
import java.util.Set;
import javax.inject.Inject;
import static jersey.repackaged.com.google.common.collect.Sets.newHashSet;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import static org.springframework.web.bind.annotation.RequestMethod.GET;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/rest/categories")
@Transactional
public class CategoriesController {

    @Inject
    private CategoryMapper categoryMapper;

    @Inject
    private LearningActivityMapper learningActivityMapper;

    @Inject
    private CategoryRepository categoryRepository;

    @RequestMapping(method = GET, produces = "application/json")
    public Set<CategoryTO> categories() {
        return newHashSet(categoryMapper.mapToTO(categoryRepository.findAll()));
    }

    @RequestMapping(value = "/{categoryId}", method = GET, produces = "application/json")
    public CategoryTO category(@PathVariable Long categoryId) {
        return categoryMapper.mapToTO(categoryRepository.findOne(categoryId));
    }

    @RequestMapping(value = "/{categoryId}/learningactivities", method = GET, produces = "application/json")
    public LearningActivityTOList learningActivitiesForCategory(@PathVariable Long categoryId) {
        return new LearningActivityTOArrayList(learningActivityMapper.mapToTO(categoryRepository.findOne(categoryId).getActivities()));
    }

}
