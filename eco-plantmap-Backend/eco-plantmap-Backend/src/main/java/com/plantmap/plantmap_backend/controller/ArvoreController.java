package com.plantmap.controller;

import com.plantmap.model.Arvore;
import com.plantmap.repository.ArvoreRepository;

import org.springframework.beans.factory.annoyation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@RestControler: Cria API REST
@RestControler
//@RequestMapping("/arvores"): Rota principal
@RequestMapping("/arvore")
//@Crossorigin: Permite HTML/JavaScript acesar a API
@CrossOrigin
public class ArvoreController {

    @Autowired
    private ArvoreRepository repository;

    @GetMapping
    public List<Arvore> listar() {
        return repository.findAll();
    }

    @PostMapping
    public Arvore salvar(@RequestBody Arvore arvore) {
        return repository.save(arvore);
    }
}