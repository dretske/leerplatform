package be.decock.steven.leerplatform.domain;

import java.util.Map;
import static org.assertj.core.util.Maps.newHashMap;
import org.springframework.data.annotation.Id;

public class Test {
    
    @Id
    private long id;
    private String title;
    private String subTitle;
    private String path;
    private Map<String, Object> pathParams;

    public Test() {
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
    
    public static class TestBuilder {
        
        private static long idCounter = 1;
        
        public static TestBuilder aTest() {
            return new TestBuilder();
        }
        
        private String title;
        private String subTitle;
        private String path;
        private Map<String, Object> pathParams = newHashMap();
        
        public Test build() {
            final Test test = new Test();
            
            test.id = idCounter++;
            test.title = this.title;
            test.subTitle = this.subTitle;
            test.path = this.path;
            test.pathParams = this.pathParams;
            
            return test;
        }
        
        public TestBuilder withTitle(String title) {
            this.title = title;
            return this;
        }
        
        public TestBuilder withSubTitle(String subTitle) {
            this.subTitle = subTitle;
            return this;
        }
        
        public TestBuilder withPath(String path) {
            this.path = path;
            return this;
        }
        
        public TestBuilder withPathParam(String name, Object value) {
            this.pathParams.put(name, value);
            return this;
        }
        
    }
    
}
