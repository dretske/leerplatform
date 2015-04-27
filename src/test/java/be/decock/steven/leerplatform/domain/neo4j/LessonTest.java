/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package be.decock.steven.leerplatform.domain.neo4j;

import java.util.Map;
import jersey.repackaged.com.google.common.collect.Maps;
import static jersey.repackaged.com.google.common.collect.Maps.newHashMap;
import org.assertj.core.api.Assertions;
import static org.assertj.core.api.Assertions.assertThat;

/**
 *
 * @author stevendecock
 */
public class LessonTest {
    
    @org.junit.Test
    public void pathParamsToJson() {
        Lesson lesson = new Lesson();

        Map<String, String> pathParams = newHashMap();
        pathParams.put("paramKey", "paramValue");
        pathParams.put("paramKey2", "paramValue2");
        
        lesson.setPathParams(pathParams);
        
        assertThat(lesson.pathParamsAsJSON).isEqualTo("{\"paramKey\":\"paramValue\",\"paramKey2\":\"paramValue2\"}");
    }
    
    @org.junit.Test
    public void pathParamsFromJson() {
        Lesson lesson = new Lesson();
        lesson.pathParamsAsJSON = "{\"paramKey\":\"paramValue\",\"paramKey2\":\"paramValue2\"}";
        
        assertThat(lesson.getPathParams()).hasSize(2);
        assertThat(lesson.getPathParams().get("paramKey")).isEqualTo("paramValue");
        assertThat(lesson.getPathParams().get("paramKey2")).isEqualTo("paramValue2");
    }
    
}
