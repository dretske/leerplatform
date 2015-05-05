package be.decock.steven.leerplatform.domain.neo4j;

public class LessonTestBuilder extends LearningActivityTestBuilder<Lesson, LessonTestBuilder> {
    

    private LessonTestBuilder() {
    }
    
    public static LessonTestBuilder aLesson() {
        return new LessonTestBuilder()
                .withTitle("defaultLessonTitle")
                .withSubTitle("defaultLessonSubTitle")
                .withPath("defaultLessonPath");
    }
    
    @Override
    public Lesson build() {
        final Lesson lesson = super.build();
        
        return lesson;
    }

    @Override
    protected LessonTestBuilder self() {
        return this;
    }

    @Override
    protected Lesson createInstance() {
        return new Lesson();
    }
    
}
