package com.bangbang.domain.item;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface ManageOptionRepository extends JpaRepository<ManageOption, Long> {

    @Transactional(readOnly = true)
    @Query(value = "select m from ManageOption m where m.item_id=:itemId")
    ManageOption findByItemId(@Param("itemId")long itemId);
}