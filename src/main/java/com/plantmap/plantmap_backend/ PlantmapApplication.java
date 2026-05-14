package com.plantmap.plantmap_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*@SpringBootAplication: Está anotação indica "Este é o projeto principal
 da aplicação", ativando automaticamente
*/
@SpringBootApplication
public class PlantmapApplication {
    public static void main (String[] args) {
        SpringApplication.run(PlantmapApplication.class, args);
    }
}