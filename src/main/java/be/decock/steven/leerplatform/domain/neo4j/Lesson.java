package be.decock.steven.leerplatform.domain.neo4j;

import org.springframework.data.annotation.TypeAlias;
import org.springframework.data.neo4j.annotation.NodeEntity;

@NodeEntity
@TypeAlias("Lesson")
public class Lesson extends LearningActivity {
    
}
