package com.samuel_resende.controle_funcionario_EPI.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.samuel_resende.controle_funcionario_EPI.Model.EPI;

@Repository
public interface EpiRepository extends JpaRepository<EPI, Long> {
    
}