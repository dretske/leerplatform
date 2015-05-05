package be.decock.steven.leerplatform.service.data;

import java.io.Serializable;
import static org.apache.commons.lang3.builder.EqualsBuilder.reflectionEquals;
import org.apache.commons.lang3.builder.HashCodeBuilder;

class TransferObject implements Serializable {

    @Override
    public boolean equals(Object obj) {
        return reflectionEquals(this, obj);
    }

    @Override
    public int hashCode() {
        return HashCodeBuilder.reflectionHashCode(this);
    }
    
}
