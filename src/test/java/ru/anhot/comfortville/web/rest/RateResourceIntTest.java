package ru.anhot.comfortville.web.rest;

import ru.anhot.comfortville.ComfortvilleApp;

import ru.anhot.comfortville.domain.Rate;
import ru.anhot.comfortville.repository.RateRepository;
import ru.anhot.comfortville.service.RateService;
import ru.anhot.comfortville.repository.search.RateSearchRepository;
import ru.anhot.comfortville.service.dto.RateDTO;
import ru.anhot.comfortville.service.mapper.RateMapper;
import ru.anhot.comfortville.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.ZonedDateTime;
import java.time.ZoneOffset;
import java.time.ZoneId;
import java.util.List;

import static ru.anhot.comfortville.web.rest.TestUtil.sameInstant;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the RateResource REST controller.
 *
 * @see RateResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ComfortvilleApp.class)
public class RateResourceIntTest {

    private static final Integer DEFAULT_SCORE = 1;
    private static final Integer UPDATED_SCORE = 2;

    private static final ZonedDateTime DEFAULT_DATE = ZonedDateTime.ofInstant(Instant.ofEpochMilli(0L), ZoneOffset.UTC);
    private static final ZonedDateTime UPDATED_DATE = ZonedDateTime.now(ZoneId.systemDefault()).withNano(0);

    @Autowired
    private RateRepository rateRepository;

    @Autowired
    private RateMapper rateMapper;

    @Autowired
    private RateService rateService;

    @Autowired
    private RateSearchRepository rateSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restRateMockMvc;

    private Rate rate;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final RateResource rateResource = new RateResource(rateService);
        this.restRateMockMvc = MockMvcBuilders.standaloneSetup(rateResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Rate createEntity(EntityManager em) {
        Rate rate = new Rate()
            .score(DEFAULT_SCORE)
            .date(DEFAULT_DATE);
        return rate;
    }

    @Before
    public void initTest() {
        rateSearchRepository.deleteAll();
        rate = createEntity(em);
    }

    @Test
    @Transactional
    public void createRate() throws Exception {
        int databaseSizeBeforeCreate = rateRepository.findAll().size();

        // Create the Rate
        RateDTO rateDTO = rateMapper.toDto(rate);
        restRateMockMvc.perform(post("/api/rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rateDTO)))
            .andExpect(status().isCreated());

        // Validate the Rate in the database
        List<Rate> rateList = rateRepository.findAll();
        assertThat(rateList).hasSize(databaseSizeBeforeCreate + 1);
        Rate testRate = rateList.get(rateList.size() - 1);
        assertThat(testRate.getScore()).isEqualTo(DEFAULT_SCORE);
        assertThat(testRate.getDate()).isEqualTo(DEFAULT_DATE);

        // Validate the Rate in Elasticsearch
        Rate rateEs = rateSearchRepository.findOne(testRate.getId());
        assertThat(rateEs).isEqualToComparingFieldByField(testRate);
    }

    @Test
    @Transactional
    public void createRateWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = rateRepository.findAll().size();

        // Create the Rate with an existing ID
        rate.setId(1L);
        RateDTO rateDTO = rateMapper.toDto(rate);

        // An entity with an existing ID cannot be created, so this API call must fail
        restRateMockMvc.perform(post("/api/rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rateDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Rate in the database
        List<Rate> rateList = rateRepository.findAll();
        assertThat(rateList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllRates() throws Exception {
        // Initialize the database
        rateRepository.saveAndFlush(rate);

        // Get all the rateList
        restRateMockMvc.perform(get("/api/rates?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rate.getId().intValue())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }

    @Test
    @Transactional
    public void getRate() throws Exception {
        // Initialize the database
        rateRepository.saveAndFlush(rate);

        // Get the rate
        restRateMockMvc.perform(get("/api/rates/{id}", rate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(rate.getId().intValue()))
            .andExpect(jsonPath("$.score").value(DEFAULT_SCORE))
            .andExpect(jsonPath("$.date").value(sameInstant(DEFAULT_DATE)));
    }

    @Test
    @Transactional
    public void getNonExistingRate() throws Exception {
        // Get the rate
        restRateMockMvc.perform(get("/api/rates/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateRate() throws Exception {
        // Initialize the database
        rateRepository.saveAndFlush(rate);
        rateSearchRepository.save(rate);
        int databaseSizeBeforeUpdate = rateRepository.findAll().size();

        // Update the rate
        Rate updatedRate = rateRepository.findOne(rate.getId());
        updatedRate
            .score(UPDATED_SCORE)
            .date(UPDATED_DATE);
        RateDTO rateDTO = rateMapper.toDto(updatedRate);

        restRateMockMvc.perform(put("/api/rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rateDTO)))
            .andExpect(status().isOk());

        // Validate the Rate in the database
        List<Rate> rateList = rateRepository.findAll();
        assertThat(rateList).hasSize(databaseSizeBeforeUpdate);
        Rate testRate = rateList.get(rateList.size() - 1);
        assertThat(testRate.getScore()).isEqualTo(UPDATED_SCORE);
        assertThat(testRate.getDate()).isEqualTo(UPDATED_DATE);

        // Validate the Rate in Elasticsearch
        Rate rateEs = rateSearchRepository.findOne(testRate.getId());
        assertThat(rateEs).isEqualToComparingFieldByField(testRate);
    }

    @Test
    @Transactional
    public void updateNonExistingRate() throws Exception {
        int databaseSizeBeforeUpdate = rateRepository.findAll().size();

        // Create the Rate
        RateDTO rateDTO = rateMapper.toDto(rate);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restRateMockMvc.perform(put("/api/rates")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(rateDTO)))
            .andExpect(status().isCreated());

        // Validate the Rate in the database
        List<Rate> rateList = rateRepository.findAll();
        assertThat(rateList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteRate() throws Exception {
        // Initialize the database
        rateRepository.saveAndFlush(rate);
        rateSearchRepository.save(rate);
        int databaseSizeBeforeDelete = rateRepository.findAll().size();

        // Get the rate
        restRateMockMvc.perform(delete("/api/rates/{id}", rate.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean rateExistsInEs = rateSearchRepository.exists(rate.getId());
        assertThat(rateExistsInEs).isFalse();

        // Validate the database is empty
        List<Rate> rateList = rateRepository.findAll();
        assertThat(rateList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchRate() throws Exception {
        // Initialize the database
        rateRepository.saveAndFlush(rate);
        rateSearchRepository.save(rate);

        // Search the rate
        restRateMockMvc.perform(get("/api/_search/rates?query=id:" + rate.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(rate.getId().intValue())))
            .andExpect(jsonPath("$.[*].score").value(hasItem(DEFAULT_SCORE)))
            .andExpect(jsonPath("$.[*].date").value(hasItem(sameInstant(DEFAULT_DATE))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Rate.class);
        Rate rate1 = new Rate();
        rate1.setId(1L);
        Rate rate2 = new Rate();
        rate2.setId(rate1.getId());
        assertThat(rate1).isEqualTo(rate2);
        rate2.setId(2L);
        assertThat(rate1).isNotEqualTo(rate2);
        rate1.setId(null);
        assertThat(rate1).isNotEqualTo(rate2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(RateDTO.class);
        RateDTO rateDTO1 = new RateDTO();
        rateDTO1.setId(1L);
        RateDTO rateDTO2 = new RateDTO();
        assertThat(rateDTO1).isNotEqualTo(rateDTO2);
        rateDTO2.setId(rateDTO1.getId());
        assertThat(rateDTO1).isEqualTo(rateDTO2);
        rateDTO2.setId(2L);
        assertThat(rateDTO1).isNotEqualTo(rateDTO2);
        rateDTO1.setId(null);
        assertThat(rateDTO1).isNotEqualTo(rateDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(rateMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(rateMapper.fromId(null)).isNull();
    }
}
