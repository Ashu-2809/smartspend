package com.smartspend;

import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/transactions")
@CrossOrigin(origins = "${process.env.NEXT_PUBLIC_API_URL}/api/transactions")
public class TransactionController {
    private final TransactionRepository repo;

    public TransactionController(TransactionRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public List<Transaction> all() {
        return repo.findAll();
    }

    @PostMapping
    public Transaction add(@RequestBody Transaction item) {
        item.id = null;
        return repo.save(item);
    }

    @PutMapping("/{id}")
    public Transaction update(@PathVariable Long id, @RequestBody Transaction item) {
        Transaction old = repo.findById(id).orElseThrow();
        old.title = item.title;
        old.amount = item.amount;
        old.type = item.type;
        old.category = item.category;
        old.date = item.date;
        return repo.save(old);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        repo.deleteById(id);
    }
}
