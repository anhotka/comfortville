package ru.anhot.comfortville.service.mapper;

import ru.anhot.comfortville.domain.*;
import ru.anhot.comfortville.service.dto.CommentDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Comment and its DTO CommentDTO.
 */
@Mapper(componentModel = "spring", uses = {PersonMapper.class, SiteMapper.class, })
public interface CommentMapper extends EntityMapper <CommentDTO, Comment> {

    @Mapping(source = "person.id", target = "personId")

    @Mapping(source = "site.id", target = "siteId")
    CommentDTO toDto(Comment comment); 

    @Mapping(source = "personId", target = "person")

    @Mapping(source = "siteId", target = "site")
    Comment toEntity(CommentDTO commentDTO); 
    default Comment fromId(Long id) {
        if (id == null) {
            return null;
        }
        Comment comment = new Comment();
        comment.setId(id);
        return comment;
    }
}
