package ru.anhot.comfortville.repository.search;

import ru.anhot.comfortville.domain.Rate;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Rate entity.
 */
public interface RateSearchRepository extends ElasticsearchRepository<Rate, Long> {
}
