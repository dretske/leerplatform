package be.decock.steven.leerplatform.config;

import org.neo4j.graphdb.GraphDatabaseService;
import org.neo4j.graphdb.factory.GraphDatabaseFactory;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.neo4j.config.EnableNeo4jRepositories;
import org.springframework.data.neo4j.config.Neo4jConfiguration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableNeo4jRepositories(basePackages = "be.decock.steven.leerplatform")
@EnableTransactionManagement
@Profile("EmbeddedNeo4J")
public class EmbeddedNeo4JConfiguration extends Neo4jConfiguration {

    private static final Logger LOGGER = LoggerFactory.getLogger(EmbeddedNeo4JConfiguration.class);

    public EmbeddedNeo4JConfiguration() {
        setBasePackage("be.decock.steven.leerplatform.domain.neo4j");
    }

    @Bean
    GraphDatabaseService graphDatabaseService() {
        return new GraphDatabaseFactory().newEmbeddedDatabase("leerplatformneo4j.db");
    }

}