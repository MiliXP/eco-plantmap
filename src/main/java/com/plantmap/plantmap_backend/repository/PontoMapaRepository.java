package com.plantmap.plantmap_backend.repository;

import com.plantmap.plantmap_backend.model.PontoMapa;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
/*JpaRepository cria automaticamente: salvar, buscar, deletar, atualizar;
* ou seja, você nao irá precisar escrever SQL manual */
public interface PontoMapaRepository extends JpaRepository<PontoMapa, Long> {
}