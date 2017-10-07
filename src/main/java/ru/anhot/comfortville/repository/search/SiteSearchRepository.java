package ru.anhot.comfortville.repository.search;

import ru.anhot.comfortville.domain.Site;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Site entity.
 */
public interface SiteSearchRepository extends ElasticsearchRepository<Site, Long> {
}
