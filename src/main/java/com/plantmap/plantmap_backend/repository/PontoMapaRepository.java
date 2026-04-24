package com.plantmap.repository;

import com.plantmap.model.PontoMapa;
import org.springframework.data.jpa.repository.JpaRepository;
/*JpaRepository cria automaticamente: salvar, buscar, deletar, atualizar;
* ou seja, você nao irá precisar escrever SQL manual */
public interface PontoMapaRepository extends JpaRepository<PontoMapa, long> {
}