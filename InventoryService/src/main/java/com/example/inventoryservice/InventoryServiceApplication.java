package com.example.inventoryservice;

import com.example.inventoryservice.entities.Product;
import com.example.inventoryservice.repositories.ProductRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.stream.Stream;

@SpringBootApplication @AllArgsConstructor
public class InventoryServiceApplication {
    RepositoryRestConfiguration repositoryRestConfiguration;

    public static void main(String[] args) {
        SpringApplication.run(InventoryServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(ProductRepository productRepository){
        repositoryRestConfiguration.exposeIdsFor(Product.class);
        return args -> {
            Stream.of("nike","adidas").forEach(p->{
                Product product=new Product();
                product.setName(p);
                product.setPrice(20.00);
                product.setQuantity(20000.00);
                productRepository.save(product);


            });
        };
    }

}
