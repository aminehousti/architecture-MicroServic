package com.example.billingservice;

import com.example.billingservice.entities.Bill;
import com.example.billingservice.entities.ProductItem;
import com.example.billingservice.feign.CustomerRestClient;
import com.example.billingservice.feign.ProductRestClient;
import com.example.billingservice.models.Customer;
import com.example.billingservice.models.Product;
import com.example.billingservice.repositories.BillRepository;
import com.example.billingservice.repositories.ProductItemRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Bean;
import org.springframework.hateoas.PagedModel;

import java.util.Date;

@SpringBootApplication
@EnableFeignClients
public class BillingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(BillingServiceApplication.class, args);
    }
    @Bean
    CommandLineRunner start(CustomerRestClient customerRestClient,
                            ProductRestClient productRestClient,
                            BillRepository billRepository, ProductItemRepository productItemRepository){
        return args -> {
            Customer customer=customerRestClient.getCustomerById(1L);
            Bill bill=billRepository.save(new Bill(null,new Date(),null,customer.getId(),customer));
            PagedModel<Product> productPagedModel=productRestClient.pageProduct(1,1);
            productPagedModel.forEach(p->{
                ProductItem productItem=new ProductItem();
                productItem.setPrice(p.getPrice());
                productItem.setProduct(p);
                productItem.setQuantity(p.getQuantity());
                productItem.setBill(bill);
                productItem.setProductId(p.getId());
                productItemRepository.save(productItem);
            });

        };
    }

}
