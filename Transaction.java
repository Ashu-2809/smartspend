package com.smartspend;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
public class Transaction {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long id;
    public String title;
    public BigDecimal amount;
    public String type;       // INCOME or EXPENSE
    public String category;
    public LocalDate date;
}
