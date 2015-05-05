package be.decock.steven.leerplatform.domain.neo4j;

public class ExerciseTestBuilder extends LearningActivityTestBuilder<Exercise, ExerciseTestBuilder> {

    private float passPercentage = 0.7f;
    private float oneStarPercentage = 0.8f;
    private float twoStarPercentage = 0.9f;
    private float threeStarPercentage = 1.0f;
    
    private ExerciseTestBuilder() {
    }
            
    public static ExerciseTestBuilder anExercise() {
        return new ExerciseTestBuilder()
                .withTitle("defaultExerciseTitle")
                .withSubTitle("defaultExerciseSubTitle")
                .withPath("defaultExercisePath");
    }

    @Override
    public Exercise build() {
        final Exercise exercise = super.build();
        
        exercise.setPassPercentage(passPercentage);
        exercise.setOneStarPercentage(oneStarPercentage);
        exercise.setTwoStarPercentage(twoStarPercentage);
        exercise.setThreeStarPercentage(threeStarPercentage);
        
        return exercise;
    }

    @Override
    protected ExerciseTestBuilder self() {
        return this;
    }

    @Override
    protected Exercise createInstance() {
        return new Exercise();
    }
    
    public ExerciseTestBuilder withOneStarPercentage(float oneStarPercentage) {
        this.oneStarPercentage = oneStarPercentage;
        return this;
    }
    
    public ExerciseTestBuilder withTwoStarPercentage(float twoStarPercentage) {
        this.twoStarPercentage = twoStarPercentage;
        return this;
    }
    
    public ExerciseTestBuilder withThreeStarPercentage(float threeStarPercentage) {
        this.threeStarPercentage = threeStarPercentage;
        return this;
    }
    
}
