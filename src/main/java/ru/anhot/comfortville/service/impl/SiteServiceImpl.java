package ru.anhot.comfortville.service.impl;

import ru.anhot.comfortville.service.SiteService;
import ru.anhot.comfortville.domain.Site;
import ru.anhot.comfortville.repository.SiteRepository;
import ru.anhot.comfortville.repository.search.SiteSearchRepository;
import ru.anhot.comfortville.service.dto.SiteDTO;
import ru.anhot.comfortville.service.mapper.SiteMapper;
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
 * Service Implementation for managing Site.
 */
@Service
@Transactional
public class SiteServiceImpl implements SiteService{

    private final Logger log = LoggerFactory.getLogger(SiteServiceImpl.class);

    private final SiteRepository siteRepository;

    private final SiteMapper siteMapper;

    private final SiteSearchRepository siteSearchRepository;

    public SiteServiceImpl(SiteRepository siteRepository, SiteMapper siteMapper, SiteSearchRepository siteSearchRepository) {
        this.siteRepository = siteRepository;
        this.siteMapper = siteMapper;
        this.siteSearchRepository = siteSearchRepository;
    }

    /**
     * Save a site.
     *
     * @param siteDTO the entity to save
     * @return the persisted entity
     */
    @Override
    public SiteDTO save(SiteDTO siteDTO) {
        log.debug("Request to save Site : {}", siteDTO);
        Site site = siteMapper.toEntity(siteDTO);
        site = siteRepository.save(site);
        SiteDTO result = siteMapper.toDto(site);
        siteSearchRepository.save(site);
        return result;
    }

    /**
     *  Get all the sites.
     *
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SiteDTO> findAll() {
        log.debug("Request to get all Sites");
        return siteRepository.findAll().stream()
            .map(siteMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }

    /**
     *  Get one site by id.
     *
     *  @param id the id of the entity
     *  @return the entity
     */
    @Override
    @Transactional(readOnly = true)
    public SiteDTO findOne(Long id) {
        log.debug("Request to get Site : {}", id);
        Site site = siteRepository.findOne(id);
        return siteMapper.toDto(site);
    }

    /**
     *  Delete the  site by id.
     *
     *  @param id the id of the entity
     */
    @Override
    public void delete(Long id) {
        log.debug("Request to delete Site : {}", id);
        siteRepository.delete(id);
        siteSearchRepository.delete(id);
    }

    /**
     * Search for the site corresponding to the query.
     *
     *  @param query the query of the search
     *  @return the list of entities
     */
    @Override
    @Transactional(readOnly = true)
    public List<SiteDTO> search(String query) {
        log.debug("Request to search Sites for query {}", query);
        return StreamSupport
            .stream(siteSearchRepository.search(queryStringQuery(query)).spliterator(), false)
            .map(siteMapper::toDto)
            .collect(Collectors.toList());
    }
}
