package com.bank.minibank;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin
public class BankController {

    @Autowired
    private AccountRepository repo;

    // Create Account
    @PostMapping("/create")
    public Account create(@RequestBody Account acc) {
        return repo.save(acc);
    }

    // Check Balance
    @GetMapping("/balance/{id}")
    public double getBalance(@PathVariable int id) {
        return repo.findById(id).get().getBalance();
    }

    // Deposit
    @PostMapping("/deposit")
    public String deposit(@RequestBody Account acc) {
        Account a = repo.findById(acc.getId()).get();
        a.setBalance(a.getBalance() + acc.getBalance());
        repo.save(a);
        return "Money Deposited!";
    }

    @PostMapping("/withdraw")
public String withdraw(@RequestBody Account acc) {
    Account a = repo.findById(acc.getId()).get();

    if (a.getBalance() < acc.getBalance()) {
        return "Insufficient Balance!";
    }

    a.setBalance(a.getBalance() - acc.getBalance());
    repo.save(a);

    return "Money Withdrawn!";
} 
}

