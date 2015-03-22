package be.decock.steven.leerplatform.domain;

import java.util.List;
import org.springframework.data.annotation.Id;

public class Test {
    
    @Id
    private String id;
    private String title;
    private String subTitle;
    private String path;
    private List<PathParam> pathParams;
    private String categoryId;

    public Test() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
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
    
    public String getCategoryId() {
        return categoryId;
    }
    
    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public List<PathParam> getPathParams() {
        return pathParams;
    }

    public void setPathParams(List<PathParam> pathParams) {
        this.pathParams = pathParams;
    }
        
}
