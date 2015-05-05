package be.decock.steven.leerplatform.domain.neo4j;

import java.util.HashMap;
import java.util.Map;

public abstract class LearningActivityTestBuilder<T extends LearningActivity, B extends LearningActivityTestBuilder<T, B>> {
    
    private String title = "defaultLessonTitle";
    private String subTitle = "defaultLessonSubTitle";
    private String path = "defaultLessonPath";
    private Map<String, String> pathParams = new HashMap<>();
    private LearningActivity nextActivity = null;
    
    protected abstract B self();
    
    protected abstract T createInstance();
    
    public T build() {
        final T learningActvity = createInstance();
        
        learningActvity.setTitle(title);
        learningActvity.setSubTitle(subTitle);
        learningActvity.setPath(path);
        learningActvity.setPathParams(pathParams);
        learningActvity.setNextActivity(nextActivity);
        
        return learningActvity;
    }
    
    public B withTitle(String title) {
        this.title = title;
        return self();
    }
    
    public B withSubTitle(String subTitle) {
        this.subTitle = subTitle;
        return self();
    }
    
    public B withPath(String path) {
        this.path = path;
        return self();
    }
    
    public B withPathParam(String key, String value) {
        this.pathParams.put(key, value);
        return self();
    }
    
    public B withNextActivity(LearningActivity activity) {
        this.nextActivity = activity;
        return self();
    }
    
}
