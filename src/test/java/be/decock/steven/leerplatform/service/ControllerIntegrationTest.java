package be.decock.steven.leerplatform.service;

import org.springframework.boot.test.IntegrationTest;
import org.springframework.boot.test.TestRestTemplate;
import org.springframework.web.client.RestTemplate;

@IntegrationTest({"server.port=9000"})
public abstract class ControllerIntegrationTest extends BaseIntegrationTest {
 
    private final RestTemplate restTemplate = new TestRestTemplate();
    
    protected RestTemplate getRestTemplate() {
        return restTemplate;
    }
    
}
