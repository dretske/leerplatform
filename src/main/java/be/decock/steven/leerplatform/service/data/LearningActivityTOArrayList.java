package be.decock.steven.leerplatform.service.data;

import com.google.common.collect.Lists;
import static com.google.common.collect.Lists.newArrayList;
import java.util.ArrayList;

public class LearningActivityTOArrayList extends ArrayList<LearningActivityTO> implements LearningActivityTOList {

    public LearningActivityTOArrayList(Iterable<LearningActivityTO> iterable) {
        super(newArrayList(iterable));
    }
    
}
