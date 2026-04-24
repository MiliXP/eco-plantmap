package com.plantmap.controller;

import com.plantmap.model.PontoMapa;
import cpm.plantmap.repository.PontoMapaRepository;

import org.springframework.beans.factory.annotation.autowired;
import org.springframework.web.bind.annotation.*;

import java.util.list;

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