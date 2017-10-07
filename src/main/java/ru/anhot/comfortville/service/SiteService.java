package ru.anhot.comfortville.service;

import ru.anhot.comfortville.service.dto.SiteDTO;
import java.util.List;

/**
 * Service Interface for managing Site.
 */
public interface SiteService {

    /**
     * Save a site.
     *
     * @param siteDTO the entity to save
     * @return the persisted entity
     */
    SiteDTO save(SiteDTO siteDTO);

    /**
     *  Get all the sites.
     *
     *  @return the list of entities
     */
    List<SiteDTO> findAll();

    /**
     *  Get the "id" site.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    SiteDTO findOne(Long id);

    /**
     *  Delete the "id" site.
     *
     *  @param id the id of the entity
     */
    void delete(Long id);

    /**
     * Search for the site corresponding to the query.
     *
     *  @param query the query of the search
     *  
     *  @return the list of entities
     */
    List<SiteDTO> search(String query);
}
