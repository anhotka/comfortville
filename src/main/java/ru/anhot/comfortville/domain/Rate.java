package ru.anhot.comfortville.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;
import org.springframework.data.elasticsearch.annotations.Document;

import javax.persistence.*;
import java.io.Serializable;
import java.time.ZonedDateTime;
import java.util.Objects;

/**
 * A Rate.
 */
@Entity
@Table(name = "rate")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
@Document(indexName = "rate")
public class Rate implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "score")
    private Integer score;

    @Column(name = "jhi_date")
    private ZonedDateTime date;

    @OneToOne
    @JoinColumn(unique = true)
    private Site site;

    @OneToOne
    @JoinColumn(unique = true)
    private Person person;

    // jhipster-needle-entity-add-field - Jhipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getScore() {
        return score;
    }

    public Rate score(Integer score) {
        this.score = score;
        return this;
    }

    public void setScore(Integer score) {
        this.score = score;
    }

    public ZonedDateTime getDate() {
        return date;
    }

    public Rate date(ZonedDateTime date) {
        this.date = date;
        return this;
    }

    public void setDate(ZonedDateTime date) {
        this.date = date;
    }

    public Site getSite() {
        return site;
    }

    public Rate site(Site site) {
        this.site = site;
        return this;
    }

    public void setSite(Site site) {
        this.site = site;
    }

    public Person getPerson() {
        return person;
    }

    public Rate person(Person person) {
        this.person = person;
        return this;
    }

    public void setPerson(Person person) {
        this.person = person;
    }
    // jhipster-needle-entity-add-getters-setters - Jhipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        Rate rate = (Rate) o;
        if (rate.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), rate.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "Rate{" +
            "id=" + getId() +
            ", score='" + getScore() + "'" +
            ", date='" + getDate() + "'" +
            "}";
    }
}
