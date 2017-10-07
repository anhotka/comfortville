package ru.anhot.comfortville.service.dto;


import java.io.Serializable;
import java.util.Objects;
import javax.persistence.Lob;

/**
 * A DTO for the Section entity.
 */
public class SectionDTO implements Serializable {

    private Long id;

    private String name;

    @Lob
    private byte[] pic;
    private String picContentType;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public byte[] getPic() {
        return pic;
    }

    public void setPic(byte[] pic) {
        this.pic = pic;
    }

    public String getPicContentType() {
        return picContentType;
    }

    public void setPicContentType(String picContentType) {
        this.picContentType = picContentType;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        SectionDTO sectionDTO = (SectionDTO) o;
        if(sectionDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), sectionDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "SectionDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", pic='" + getPic() + "'" +
            "}";
    }
}
