package com.example.customerservice;

import com.example.customerservice.entities.Customer;
import com.example.customerservice.repositories.CustomerRepository;
import lombok.AllArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;

import java.util.stream.Stream;

@SpringBootApplication @AllArgsConstructor
public class CustomerServiceApplication {
    CustomerRepository customerRepository;
    RepositoryRestConfiguration repositoryRestConfiguration;

    public static void main(String[] args) {
        SpringApplication.run(CustomerServiceApplication.class, args);
    }

    @Bean
    CommandLineRunner start(){
        repositoryRestConfiguration.exposeIdsFor(Customer.class);
        return args -> {
            Stream.of("amine","salma","paty").forEach(c->{
                Customer customer=new Customer();
                customer.setName(c);
                customer.setEmail(c+"@gmail.com");
                customerRepository.save(customer);
                System.out.println(customer.toString());

            });
        };
    }

}
