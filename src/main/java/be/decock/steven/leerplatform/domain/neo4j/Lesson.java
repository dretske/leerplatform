package be.decock.steven.leerplatform.domain.neo4j;

import static be.decock.steven.leerplatform.domain.neo4j.LearningActivity.LearningActivityType.LESSON;

public class Lesson extends LearningActivity {

    @Override
    public LearningActivityType getType() {
        return LESSON;
    }
    
}
