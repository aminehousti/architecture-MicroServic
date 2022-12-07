package com.example.billingservice.web;

import com.example.billingservice.entities.Bill;
import com.example.billingservice.feign.CustomerRestClient;
import com.example.billingservice.feign.ProductRestClient;
import com.example.billingservice.repositories.BillRepository;
import com.example.billingservice.repositories.ProductItemRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController @AllArgsConstructor
public class BillingRestController {
    private CustomerRestClient customerRestClient;
    private ProductRestClient productRestClient;
    private BillRepository billRepository;
    private ProductItemRepository productItemRepository;

    @GetMapping("/fullbill/{id}")
    public Bill getBill(@PathVariable(name="id") Long id){
        return billRepository.findById(id).get();
    }

}
