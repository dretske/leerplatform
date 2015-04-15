package be.decock.steven.leerplatform;

import java.io.IOException;
import org.neo4j.graphdb.GraphDatabaseService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.neo4j.config.EnableNeo4jRepositories;
import org.springframework.data.neo4j.config.Neo4jConfiguration;
import org.springframework.data.neo4j.rest.SpringRestGraphDatabase;
import org.springframework.transaction.annotation.EnableTransactionManagement;

public class Application {
    
    @SpringBootApplication
    @EnableNeo4jRepositories(basePackages = "be.decock.steven.leerplatform")
    @EnableTransactionManagement
    static class ApplicationConfig extends Neo4jConfiguration {

            public ApplicationConfig() {
                    setBasePackage("be.decock.steven.leerplatform.domain.neo4j");
            }
            
            @Bean
            GraphDatabaseService graphDatabaseService() {
                String grapheneDbUrl = System.getProperty("GrapheneDbUrl");
                if (grapheneDbUrl == null) {
                    grapheneDbUrl = "http://localhost:7474/db/data";
                }
                System.out.println("Connecting to GrapheneDB with url " + grapheneDbUrl);
                return new SpringRestGraphDatabase(grapheneDbUrl);
            }   

    }
    
    public static void main(String[] args) throws IOException {
        SpringApplication.run(ApplicationConfig.class, args);
    }
    
}
