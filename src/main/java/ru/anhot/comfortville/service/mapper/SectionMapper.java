package ru.anhot.comfortville.service.mapper;

import ru.anhot.comfortville.domain.*;
import ru.anhot.comfortville.service.dto.SectionDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Section and its DTO SectionDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface SectionMapper extends EntityMapper <SectionDTO, Section> {
    
    
    default Section fromId(Long id) {
        if (id == null) {
            return null;
        }
        Section section = new Section();
        section.setId(id);
        return section;
    }
}
