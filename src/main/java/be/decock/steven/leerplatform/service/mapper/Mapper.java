package be.decock.steven.leerplatform.service.mapper;

import java.util.ArrayList;
import java.util.List;

public interface Mapper<DOMAIN, TO> {
    
    TO mapToTO(DOMAIN from);
    DOMAIN mapToDomain(TO to);
    
    default Iterable<TO> mapToTO(final Iterable<DOMAIN> domainIterable) {
        final List<TO> result = new ArrayList<>();
        domainIterable.forEach(domain -> result.add(mapToTO(domain)));
        return result;
    }
    
    default Iterable<DOMAIN> mapToDomain(final Iterable<TO> toIterable) {
        final List<DOMAIN> result = new ArrayList<>();
        toIterable.forEach(to -> result.add(mapToDomain(to)));
        return result;
    }
    
}
