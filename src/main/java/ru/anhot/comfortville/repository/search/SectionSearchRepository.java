package ru.anhot.comfortville.repository.search;

import ru.anhot.comfortville.domain.Section;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;

/**
 * Spring Data Elasticsearch repository for the Section entity.
 */
public interface SectionSearchRepository extends ElasticsearchRepository<Section, Long> {
}
