package ru.anhot.comfortville.repository;

import ru.anhot.comfortville.domain.Rate;
import org.springframework.stereotype.Repository;

import org.springframework.data.jpa.repository.*;


/**
 * Spring Data JPA repository for the Rate entity.
 */
@SuppressWarnings("unused")
@Repository
public interface RateRepository extends JpaRepository<Rate, Long> {

}
