package com.bangbang.domain.item;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@Table(name="item_price")
@SuperBuilder
@NoArgsConstructor
public class ItemPrice {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long item_price_id;

    @Column(nullable = false)
    private long item_id; //FK

    @Column(nullable = true)
    private Integer item_price_buy_house;

    @Column(nullable = true)
    private Integer item_price_house_deposit;

    @Column(nullable = true)
    private Integer item_price_month_deposit;

    @Column(nullable = true)
    private Integer item_price_month_rent;
}