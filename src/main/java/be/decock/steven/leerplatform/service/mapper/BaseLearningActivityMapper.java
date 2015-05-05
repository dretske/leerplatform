package be.decock.steven.leerplatform.service.mapper;

import be.decock.steven.leerplatform.domain.neo4j.LearningActivity;
import be.decock.steven.leerplatform.service.data.LearningActivityTO;

public abstract class BaseLearningActivityMapper<DOMAIN extends LearningActivity, TO extends LearningActivityTO> implements Mapper<DOMAIN, TO> {

    protected abstract DOMAIN createDomainInstance();

    protected abstract TO createTOInstance();
    
    @Override
    public TO mapToTO(DOMAIN from) {
        final TO to = createTOInstance();
        
        to.id = from.getId();
        to.title = from.getTitle();
        to.subTitle = from.getSubTitle();
        to.path = from.getPath();
        to.pathParams = from.getPathParams();
        
        return to;
    }

    @Override
    public DOMAIN mapToDomain(TO to) {
        throw new UnsupportedOperationException("Not supported yet.");
    }
    
}
