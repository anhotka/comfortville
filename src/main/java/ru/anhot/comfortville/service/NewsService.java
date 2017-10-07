package ru.anhot.comfortville.service;

import ru.anhot.comfortville.service.dto.NewsDTO;
import java.util.List;

/**
 * Service Interface for managing News.
 */
public interface NewsService {

    /**
     * Save a news.
     *
     * @param newsDTO the entity to save
     * @return the persisted entity
     */
    NewsDTO save(NewsDTO newsDTO);

    /**
     *  Get all the news.
     *
     *  @return the list of entities
     */
    List<NewsDTO> findAll();

    /**
     *  Get the "id" news.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    NewsDTO findOne(Long id);

    /**
     *  Delete the "id" news.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the news corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @return the list of entities
     */
    List<NewsDTO> search(String query);
}
