package ru.anhot.comfortville.service.mapper;

import ru.anhot.comfortville.domain.*;
import ru.anhot.comfortville.service.dto.NewsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity News and its DTO NewsDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class, })
public interface NewsMapper extends EntityMapper <NewsDTO, News> {

    @Mapping(source = "person.id", target = "personId")
    NewsDTO toDto(News news); 

    @Mapping(source = "personId", target = "person")
    News toEntity(NewsDTO newsDTO); 
    default News fromId(Long id) {
        if (id == null) {
            return null;
        }
        News news = new News();
        news.setId(id);
        return news;
    }
}
