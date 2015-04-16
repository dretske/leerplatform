package be.decock.steven.leerplatform;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URL;
import static com.google.common.base.Throwables.propagate;
import org.neo4j.graphdb.GraphDatabaseService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.neo4j.config.EnableNeo4jRepositories;
import org.springframework.data.neo4j.config.Neo4jConfiguration;
import org.springframework.data.neo4j.rest.SpringRestGraphDatabase;
import org.springframework.transaction.annotation.EnableTransactionManagement;

public class Application {
    
    private static final Logger LOGGER = LoggerFactory.getLogger(Application.class);
    
    @SpringBootApplication
    @EnableNeo4jRepositories(basePackages = "be.decock.steven.leerplatform")
    @EnableTransactionManagement
    static class ApplicationConfig extends Neo4jConfiguration {

            public ApplicationConfig() {
                setBasePackage("be.decock.steven.leerplatform.domain.neo4j");
            }
            
            @Bean
            GraphDatabaseService graphDatabaseService() {
                try {
                    String grapheneDbUrl = System.getProperty("GrapheneDbUrl");
                    if (grapheneDbUrl == null) {
                        grapheneDbUrl = "http://localhost:7474";
                    }
                    grapheneDbUrl += "/db/data";
                    LOGGER.info("Connecting to GrapheneDB with url " + grapheneDbUrl);
                    URL url = new URL(grapheneDbUrl);
                    if (hasUsernameAndPassword(url)) {
                        String username = getUserNameFromUrl(url);
                        String password = getPasswordFromUrl(url);
                        return new SpringRestGraphDatabase(url.toString(), username, password);
                    } else {
                        return new SpringRestGraphDatabase(url.toString());
                    }
                } catch (MalformedURLException ex) {
                    throw propagate(ex);
                }
            }   

        private boolean hasUsernameAndPassword(final URL url) {
            return url.getUserInfo() != null;
        }

        private String getUserNameFromUrl(final URL url) {
            return url.getUserInfo().split(":")[0];
        }

        private String getPasswordFromUrl(final URL url) {
            return url.getUserInfo().split(":")[1];
        }

    }
    
    public static void main(String[] args) throws IOException {
        SpringApplication.run(ApplicationConfig.class, args);
    }
    
}
