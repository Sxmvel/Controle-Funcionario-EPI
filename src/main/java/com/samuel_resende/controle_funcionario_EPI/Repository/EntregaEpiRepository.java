package com.samuel_resende.controle_funcionario_EPI.Repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import com.samuel_resende.controle_funcionario_EPI.Model.EntregaEPI;

@Repository
public interface EntregaEpiRepository extends JpaRepository<EntregaEPI, Long> {
    
   @Query("SELECT e FROM EntregaEPI e WHERE e.funcionario.id_funcionario = :idFuncionario")
    List<EntregaEPI> buscarHistoricoPorFuncionarioId(Long idFuncionario);
}