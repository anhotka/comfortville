package ru.anhot.comfortville.service.mapper;

import ru.anhot.comfortville.domain.*;
import ru.anhot.comfortville.service.dto.RateDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Rate and its DTO RateDTO.
 */
@Mapper(componentModel = "spring", uses = {SiteMapper.class, PersonMapper.class, })
public interface RateMapper extends EntityMapper <RateDTO, Rate> {

    @Mapping(source = "site.id", target = "siteId")

    @Mapping(source = "person.id", target = "personId")
    RateDTO toDto(Rate rate); 

    @Mapping(source = "siteId", target = "site")

    @Mapping(source = "personId", target = "person")
    Rate toEntity(RateDTO rateDTO); 
    default Rate fromId(Long id) {
        if (id == null) {
            return null;
        }
        Rate rate = new Rate();
        rate.setId(id);
        return rate;
    }
}
