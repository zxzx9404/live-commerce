package com.bangbang.domain.item;

import javax.persistence.*;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.experimental.SuperBuilder;

@Data
@Entity
@Table(name="options")
@SuperBuilder
@NoArgsConstructor
public class Option {
    @Id
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private long option_id;

    @Column(nullable = true)
    private boolean option_elevator;

    @Column(nullable = true)
    private boolean option_veranda;

    @Column(nullable = true)
    private boolean option_parking;

    @Column(nullable = true)
    private boolean option_duplex;

    @Column(nullable = true)
    private boolean option_separation;

    @Column(nullable = true)
    private boolean option_induction;

    @Column(nullable = true)
    private boolean option_microwave;

    @Column(nullable = true)
    private boolean option_aircon;

    @Column(nullable = true)
    private boolean option_washer;

    @Column(nullable = true)
    private boolean option_tv;

    @Column(nullable = true)
    private boolean option_closet;

    @Column(nullable = true)
    private boolean option_bed;

    @Column(nullable = true)
    private boolean option_table;

    @Column(nullable = true)
    private boolean option_shoe;

    @Column(nullable = true)
    private boolean option_bidet;

    @Column(nullable = true)
    private boolean option_gasrange;

    @Column(nullable = true)
    private boolean option_refrigerator;

    @Column(nullable = true)
    private boolean option_doorlock;

    @Column(nullable = false)
    private long item_id; //FK
}