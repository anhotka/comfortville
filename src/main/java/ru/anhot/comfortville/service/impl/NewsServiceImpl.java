package ru.anhot.comfortville.service.impl;

import ru.anhot.comfortville.service.NewsService;
import ru.anhot.comfortville.domain.News;
import ru.anhot.comfortville.repository.NewsRepository;
import ru.anhot.comfortville.repository.search.NewsSearchRepository;
import ru.anhot.comfortville.service.dto.NewsDTO;
import ru.anhot.comfortville.service.mapper.NewsMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing News.
 */
@Service
@Transactional
public class NewsServiceImpl implements NewsService{

    private final Logger log = LoggerFactory.getLogger(NewsServiceImpl.class);

    private final NewsRepository newsRepository;

    private final NewsMapper newsMapper;

    private final NewsSearchRepository newsSearchRepository;

    public NewsServiceImpl(NewsRepository newsRepository, NewsMapper newsMapper, NewsSearchRepository newsSearchRepository) {
        this.newsRepository = newsRepository;
        this.newsMapper = newsMapper;
        this.newsSearchRepository = newsSearchRepository;
    }

    /**
     * Save a news.
     *
     * @param newsDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public NewsDTO save(NewsDTO newsDTO) {
        log.debug("Request to save News : {}", newsDTO);
        News news = newsMapper.toEntity(newsDTO);
        news = newsRepository.save(news);
        NewsDTO result = newsMapper.toDto(news);
        newsSearchRepository.save(news);
        return result;
    }

    /**
     *  Get all the news.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<NewsDTO> findAll() {
        log.debug("Request to get all News");
        return newsRepository.findAll().stream()
            .map(newsMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one news by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public NewsDTO findOne(Long id) {
        log.debug("Request to get News : {}", id);
        News news = newsRepository.findOne(id);
        return newsMapper.toDto(news);
    }

    /**
     *  Delete the  news by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete News : {}", id);
        newsRepository.delete(id);
        newsSearchRepository.delete(id);
    }

    /**
     * Search for the news corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<NewsDTO> search(String query) {
        log.debug("Request to search News for query {}", query);
        return StreamSupport
            .stream(newsSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(newsMapper::toDto)
            .collect(Collectors.toList());
    }
}
