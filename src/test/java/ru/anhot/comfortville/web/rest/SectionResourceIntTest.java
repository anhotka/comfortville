package ru.anhot.comfortville.web.rest;

import ru.anhot.comfortville.ComfortvilleApp;

import ru.anhot.comfortville.domain.Section;
import ru.anhot.comfortville.repository.SectionRepository;
import ru.anhot.comfortville.service.SectionService;
import ru.anhot.comfortville.repository.search.SectionSearchRepository;
import ru.anhot.comfortville.service.dto.SectionDTO;
import ru.anhot.comfortville.service.mapper.SectionMapper;
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
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the SectionResource REST controller.
 *
 * @see SectionResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = ComfortvilleApp.class)
public class SectionResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final byte[] DEFAULT_PIC = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_PIC = TestUtil.createByteArray(2, "1");
    private static final String DEFAULT_PIC_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_PIC_CONTENT_TYPE = "image/png";

    @Autowired
    private SectionRepository sectionRepository;

    @Autowired
    private SectionMapper sectionMapper;

    @Autowired
    private SectionService sectionService;

    @Autowired
    private SectionSearchRepository sectionSearchRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restSectionMockMvc;

    private Section section;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final SectionResource sectionResource = new SectionResource(sectionService);
        this.restSectionMockMvc = MockMvcBuilders.standaloneSetup(sectionResource)
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
    public static Section createEntity(EntityManager em) {
        Section section = new Section()
            .name(DEFAULT_NAME)
            .pic(DEFAULT_PIC)
            .picContentType(DEFAULT_PIC_CONTENT_TYPE);
        return section;
    }

    @Before
    public void initTest() {
        sectionSearchRepository.deleteAll();
        section = createEntity(em);
    }

    @Test
    @Transactional
    public void createSection() throws Exception {
        int databaseSizeBeforeCreate = sectionRepository.findAll().size();

        // Create the Section
        SectionDTO sectionDTO = sectionMapper.toDto(section);
        restSectionMockMvc.perform(post("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sectionDTO)))
            .andExpect(status().isCreated());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeCreate + 1);
        Section testSection = sectionList.get(sectionList.size() - 1);
        assertThat(testSection.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testSection.getPic()).isEqualTo(DEFAULT_PIC);
        assertThat(testSection.getPicContentType()).isEqualTo(DEFAULT_PIC_CONTENT_TYPE);

        // Validate the Section in Elasticsearch
        Section sectionEs = sectionSearchRepository.findOne(testSection.getId());
        assertThat(sectionEs).isEqualToComparingFieldByField(testSection);
    }

    @Test
    @Transactional
    public void createSectionWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sectionRepository.findAll().size();

        // Create the Section with an existing ID
        section.setId(1L);
        SectionDTO sectionDTO = sectionMapper.toDto(section);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSectionMockMvc.perform(post("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sectionDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllSections() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get all the sectionList
        restSectionMockMvc.perform(get("/api/sections?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(section.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].picContentType").value(hasItem(DEFAULT_PIC_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].pic").value(hasItem(Base64Utils.encodeToString(DEFAULT_PIC))));
    }

    @Test
    @Transactional
    public void getSection() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);

        // Get the section
        restSectionMockMvc.perform(get("/api/sections/{id}", section.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(section.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.picContentType").value(DEFAULT_PIC_CONTENT_TYPE))
            .andExpect(jsonPath("$.pic").value(Base64Utils.encodeToString(DEFAULT_PIC)));
    }

    @Test
    @Transactional
    public void getNonExistingSection() throws Exception {
        // Get the section
        restSectionMockMvc.perform(get("/api/sections/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSection() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);
        sectionSearchRepository.save(section);
        int databaseSizeBeforeUpdate = sectionRepository.findAll().size();

        // Update the section
        Section updatedSection = sectionRepository.findOne(section.getId());
        updatedSection
            .name(UPDATED_NAME)
            .pic(UPDATED_PIC)
            .picContentType(UPDATED_PIC_CONTENT_TYPE);
        SectionDTO sectionDTO = sectionMapper.toDto(updatedSection);

        restSectionMockMvc.perform(put("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sectionDTO)))
            .andExpect(status().isOk());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeUpdate);
        Section testSection = sectionList.get(sectionList.size() - 1);
        assertThat(testSection.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testSection.getPic()).isEqualTo(UPDATED_PIC);
        assertThat(testSection.getPicContentType()).isEqualTo(UPDATED_PIC_CONTENT_TYPE);

        // Validate the Section in Elasticsearch
        Section sectionEs = sectionSearchRepository.findOne(testSection.getId());
        assertThat(sectionEs).isEqualToComparingFieldByField(testSection);
    }

    @Test
    @Transactional
    public void updateNonExistingSection() throws Exception {
        int databaseSizeBeforeUpdate = sectionRepository.findAll().size();

        // Create the Section
        SectionDTO sectionDTO = sectionMapper.toDto(section);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restSectionMockMvc.perform(put("/api/sections")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(sectionDTO)))
            .andExpect(status().isCreated());

        // Validate the Section in the database
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteSection() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);
        sectionSearchRepository.save(section);
        int databaseSizeBeforeDelete = sectionRepository.findAll().size();

        // Get the section
        restSectionMockMvc.perform(delete("/api/sections/{id}", section.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate Elasticsearch is empty
        boolean sectionExistsInEs = sectionSearchRepository.exists(section.getId());
        assertThat(sectionExistsInEs).isFalse();

        // Validate the database is empty
        List<Section> sectionList = sectionRepository.findAll();
        assertThat(sectionList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void searchSection() throws Exception {
        // Initialize the database
        sectionRepository.saveAndFlush(section);
        sectionSearchRepository.save(section);

        // Search the section
        restSectionMockMvc.perform(get("/api/_search/sections?query=id:" + section.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(section.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].picContentType").value(hasItem(DEFAULT_PIC_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].pic").value(hasItem(Base64Utils.encodeToString(DEFAULT_PIC))));
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Section.class);
        Section section1 = new Section();
        section1.setId(1L);
        Section section2 = new Section();
        section2.setId(section1.getId());
        assertThat(section1).isEqualTo(section2);
        section2.setId(2L);
        assertThat(section1).isNotEqualTo(section2);
        section1.setId(null);
        assertThat(section1).isNotEqualTo(section2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(SectionDTO.class);
        SectionDTO sectionDTO1 = new SectionDTO();
        sectionDTO1.setId(1L);
        SectionDTO sectionDTO2 = new SectionDTO();
        assertThat(sectionDTO1).isNotEqualTo(sectionDTO2);
        sectionDTO2.setId(sectionDTO1.getId());
        assertThat(sectionDTO1).isEqualTo(sectionDTO2);
        sectionDTO2.setId(2L);
        assertThat(sectionDTO1).isNotEqualTo(sectionDTO2);
        sectionDTO1.setId(null);
        assertThat(sectionDTO1).isNotEqualTo(sectionDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(sectionMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(sectionMapper.fromId(null)).isNull();
    }
}
