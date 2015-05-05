package be.decock.steven.leerplatform.service.mapper;

import be.decock.steven.leerplatform.domain.neo4j.Exercise;
import be.decock.steven.leerplatform.service.data.ExerciseTO;
import org.springframework.stereotype.Component;

@Component
public class ExerciseMapper extends BaseLearningActivityMapper<Exercise, ExerciseTO> {

    @Override
    public ExerciseTO mapToTO(Exercise from) {
        final ExerciseTO exercise = super.mapToTO(from);
        
        exercise.passPercentage = from.getPassPercentage();
        exercise.oneStarPercentage = from.getOneStarPercentage();
        exercise.twoStarPercentage = from.getTwoStarPercentage();
        exercise.threeStarPercentage = from.getThreeStarPercentage();
        
        return exercise;
    }
    
    @Override
    protected Exercise createDomainInstance() {
        return new Exercise();
    }

    @Override
    protected ExerciseTO createTOInstance() {
        return new ExerciseTO();
    }

}
