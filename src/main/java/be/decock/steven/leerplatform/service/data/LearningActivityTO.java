package be.decock.steven.leerplatform.service.data;

import com.fasterxml.jackson.annotation.JsonTypeInfo;
import java.util.Map;

@JsonTypeInfo(use=JsonTypeInfo.Id.CLASS, include=JsonTypeInfo.As.PROPERTY, property="@class")
public class LearningActivityTO extends TransferObject {

    public Long id;
    public String title;
    public String subTitle;
    public String path;
    public Map<String, String> pathParams;
    
}
