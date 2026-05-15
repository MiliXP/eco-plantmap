package com.plantmap.plantmap_backend.controller;

import com.plantmap.plantmap_backend.model.PontoMapa;
import com.plantmap.plantmap_backend.repository.PontoMapaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pontos")
@CrossOrigin
public class PontoMapaController{

    @Autowired
    private PontoMapaRepository repository;

    @GetMapping
    public List<PontoMapa> listar() {

        return repository.findAll();
    }

    @PostMapping
    public PontoMapa salvar (@RequestBody PontoMapa ponto) {

        return repository.save(ponto);
    }
}