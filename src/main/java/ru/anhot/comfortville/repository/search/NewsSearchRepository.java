package ru.anhot.comfortville.repository.search;

import ru.anhot.comfortville.domain.News;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the News entity.
 */
public interface NewsSearchRepository extends ElasticsearchRepository<News, Long> {
}
