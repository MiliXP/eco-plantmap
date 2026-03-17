package com.plantmap.repository;

import com.plantmP.model.Arvore;
import org.springframework.data.jpa.repository.JpaRepository;
/*JpaRepository cria automaticamente: salvar, buscar, deletar, atualizar;
* ou seja, você nao irá precisar escrever SQL manual */
public interface ArvoreRepository extends JpaRepository<arvore, long> {
}