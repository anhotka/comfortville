package ru.anhot.comfortville.service.mapper;

import ru.anhot.comfortville.domain.*;
import ru.anhot.comfortville.service.dto.SiteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Site and its DTO SiteDTO.
 */
@Mapper(componentModel = "spring", uses = {LocationMapper.class, SectionMapper.class, })
public interface SiteMapper extends EntityMapper <SiteDTO, Site> {

    @Mapping(source = "location.id", target = "locationId")

    @Mapping(source = "section.id", target = "sectionId")
    SiteDTO toDto(Site site); 

    @Mapping(source = "locationId", target = "location")

    @Mapping(source = "sectionId", target = "section")
    Site toEntity(SiteDTO siteDTO); 
    default Site fromId(Long id) {
        if (id == null) {
            return null;
        }
        Site site = new Site();
        site.setId(id);
        return site;
    }
}
