package com.bangbang.domain.image;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ImageRepository extends JpaRepository<Image, Long> {
  List<Image> findAll();
  Optional<Image> findByImageId(Long imageId);
}
