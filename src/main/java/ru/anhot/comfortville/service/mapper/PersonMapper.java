package ru.anhot.comfortville.service.mapper;

import ru.anhot.comfortville.domain.*;
import ru.anhot.comfortville.service.dto.PersonDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Person and its DTO PersonDTO.
 */
@Mapper(componentModel = "spring", uses = {UserMapper.class, })
public interface PersonMapper extends EntityMapper <PersonDTO, Person> {

    @Mapping(source = "user.id", target = "userId")
    PersonDTO toDto(Person person); 

    @Mapping(source = "userId", target = "user")
    Person toEntity(PersonDTO personDTO); 
    default Person fromId(Long id) {
        if (id == null) {
            return null;
        }
        Person person = new Person();
        person.setId(id);
        return person;
    }
}
