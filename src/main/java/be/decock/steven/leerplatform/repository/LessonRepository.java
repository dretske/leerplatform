package be.decock.steven.leerplatform.repository;

import be.decock.steven.leerplatform.domain.neo4j.Lesson;
import org.springframework.data.neo4j.repository.GraphRepository;

public interface LessonRepository extends GraphRepository<Lesson> {

}
