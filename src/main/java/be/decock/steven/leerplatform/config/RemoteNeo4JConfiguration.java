package be.decock.steven.leerplatform.config;

import be.decock.steven.leerplatform.Application;
import static com.google.common.base.Throwables.propagate;
import java.net.MalformedURLException;
import java.net.URL;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.data.neo4j.config.EnableNeo4jRepositories;
import org.springframework.data.neo4j.config.Neo4jConfiguration;
import org.springframework.data.neo4j.rest.SpringRestGraphDatabase;
import org.springframework.transaction.annotation.EnableTransactionManagement;

@Configuration
@EnableNeo4jRepositories(basePackages = "be.decock.steven.leerplatform")
@EnableTransactionManagement
@Profile("RemoteNeo4J")
public class RemoteNeo4JConfiguration extends Neo4jConfiguration {

    private static final Logger LOGGER = LoggerFactory.getLogger(Application.class);

    public RemoteNeo4JConfiguration() {
        setBasePackage("be.decock.steven.leerplatform.domain.neo4j");
    }

    @Bean
    SpringRestGraphDatabase graphDatabaseService() {
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