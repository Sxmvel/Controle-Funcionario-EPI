package com.samuel_resende.controle_funcionario_EPI.Service;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.samuel_resende.controle_funcionario_EPI.Model.EPI;
import com.samuel_resende.controle_funcionario_EPI.Repository.EpiRepository;

@Service
public class EpiService {

    @Autowired
    private EpiRepository epiRepository;

    // 1. C: CREATE (Criar/Salvar EPI)
    @Transactional
    public EPI salvar(EPI epi) {
        // Lógica de Negócio: Validação simples da validade do CA antes de salvar.
        if (epi.getDataValidadeCa() != null && epi.getDataValidadeCa().isBefore(LocalDate.now())) {
            System.err.println("Erro de Validação: A Data de Validade do CA já expirou. Impossível cadastrar.");
            return null;
        }
        
        //  salva o objeto no banco de dados.
        return epiRepository.save(epi);
    }

    // R: READ todos
    public List<EPI> buscarTodos() {
        return epiRepository.findAll();
    }


    // R: READ le id

    public Optional<EPI> buscarPorId(Long id) {
        return epiRepository.findById(id);
    }

    // U: UPDATE (Atualizar)
    @Transactional
    public EPI atualizar(Long id, EPI epiDetalhes) {
        Optional<EPI> epiExistente = epiRepository.findById(id);
        
        if (epiExistente.isPresent()) {
            EPI epi = epiExistente.get();
            
            // Atualiza campos que podem mudar (tipo, código, e a validade do CA)
            epi.setTipoEpi(epiDetalhes.getTipoEpi());
            epi.setCodigoReferencia(epiDetalhes.getCodigoReferencia());
            epi.setNumeroCa(epiDetalhes.getNumeroCa());
            epi.setDataValidadeCa(epiDetalhes.getDataValidadeCa());
            
            return epiRepository.save(epi);
        } else {
            return null; 
        }
    }

    // D: DELETE (Excluir)

    @Transactional
    public boolean deletar(Long id) {
        if (epiRepository.existsById(id)) {
            epiRepository.deleteById(id);
            return true;
        }
        return false;
    }
}