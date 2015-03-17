package be.decock.steven.leerplatform.domain;

import java.util.Map;
import static org.assertj.core.util.Maps.newHashMap;

public class Exercise {
    
    private long id;
    private String title;
    private String subTitle;
    private String path;
    private Map<String, Object> pathParams;

    public Exercise() {
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getSubTitle() {
        return subTitle;
    }

    public void setSubTitle(String subTitle) {
        this.subTitle = subTitle;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public Map<String, Object> getPathParams() {
        return pathParams;
    }

    public void setPathParams(Map<String, Object> pathParams) {
        this.pathParams = pathParams;
    }
    
    public static class ExerciseBuilder {
        
        private static long idCounter = 1;
        
        public static ExerciseBuilder anExercise() {
            return new ExerciseBuilder();
        }
        
        private String title;
        private String subTitle;
        private String path;
        private Map<String, Object> pathParams = newHashMap();
        
        public Exercise build() {
            final Exercise exercise = new Exercise();
            
            exercise.id = idCounter++;
            exercise.title = this.title;
            exercise.subTitle = this.subTitle;
            exercise.path = this.path;
            exercise.pathParams = this.pathParams;
            
            return exercise;
        }
        
        public ExerciseBuilder withTitle(String title) {
            this.title = title;
            return this;
        }
        
        public ExerciseBuilder withSubTitle(String subTitle) {
            this.subTitle = subTitle;
            return this;
        }
        
        public ExerciseBuilder withPath(String path) {
            this.path = path;
            return this;
        }
        
        public ExerciseBuilder withPathParam(String name, Object value) {
            this.pathParams.put(name, value);
            return this;
        }
        
    }
    
}
