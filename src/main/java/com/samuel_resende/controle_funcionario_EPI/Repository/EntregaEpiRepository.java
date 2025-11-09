package com.samuel_resende.controle_funcionario_EPI.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.samuel_resende.controle_funcionario_EPI.Model.EntregaEPI;


@Repository
public interface EntregaEpiRepository extends JpaRepository<EntregaEPI, Long> {
    
    // CORREÇÃO: Sintaxe findBy + Objeto (Funcionario) + Campo do Objeto (Id_funcionario)
    List<EntregaEPI> findByFuncionarioId_funcionario(Long idFuncionario); 
}