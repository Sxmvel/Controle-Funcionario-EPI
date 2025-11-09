package com.samuel_resende.controle_funcionario_EPI.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.samuel_resende.controle_funcionario_EPI.Model.EntregaEPI;
import com.samuel_resende.controle_funcionario_EPI.Repository.EntregaEpiRepository;
import com.samuel_resende.controle_funcionario_EPI.Repository.EpiRepository;
import com.samuel_resende.controle_funcionario_EPI.Repository.FuncionarioRepository;

@Service
public class EntregaEpiService {

    @Autowired
    private EntregaEpiRepository entregaEpiRepository;

    @Autowired
    private FuncionarioRepository funcionarioRepository;

    @Autowired
    private EpiRepository epiRepository; 

    
    // C: CREATE (Registrar Entrega)
  
    @Transactional
    public EntregaEPI registrarEntrega(EntregaEPI entregaEPI) {
        
        Long idFuncionario = entregaEPI.getFuncionario().getId_funcionario();
        if (!funcionarioRepository.existsById(idFuncionario)) {
             System.err.println("Erro: Funcionário com ID " + idFuncionario + " não encontrado.");
             return null; 
        }

        Long idEPi = entregaEPI.getEpi().getId_epi();
        if (!epiRepository.existsById(idEPi)) {
             System.err.println("Erro: EPI com ID " + idEPi + " não encontrado.");
             return null;
        }

        if (entregaEPI.getQuantidade() <= 0) {
             System.err.println("Erro: Quantidade de EPIs deve ser maior que zero.");
             return null;
        }

        return entregaEpiRepository.save(entregaEPI);
    }


    // R: READ ALL (Ler Todas as Entregas)
    public List<EntregaEPI> buscarTodas() {
        return entregaEpiRepository.findAll();
    }


    // R: READ ONE (Ler por ID)
    public Optional<EntregaEPI> buscarPorId(Long id) {
        return entregaEpiRepository.findById(id);
    }

    // U: UPDATE (Atualizar - Geralmente limitado para registros de entrega)
    @Transactional
    public EntregaEPI atualizar(Long id, EntregaEPI detalhes) {
        Optional<EntregaEPI> entregaExistente = entregaEpiRepository.findById(id);
        
        if (entregaExistente.isPresent()) {
            EntregaEPI entrega = entregaExistente.get();
            
            entrega.setDataEntrega(detalhes.getDataEntrega());
            entrega.setQuantidade(detalhes.getQuantidade());
            entrega.setDataVencimentoEpi(detalhes.getDataVencimentoEpi());
            
            return entregaEpiRepository.save(entrega);
        } else {
            return null; 
        }
    }
    // D: DELETE (Excluir Registro)
    @Transactional
    public boolean deletar(Long id) {
        if (entregaEpiRepository.existsById(id)) {
            entregaEpiRepository.deleteById(id);
            return true;
        }
        return false;
    }


    @Transactional(readOnly = true)
    public List<EntregaEPI> buscarHistoricoPorFuncionario(Long idFuncionario) {
        return entregaEpiRepository.findByFuncionarioId_funcionario(idFuncionario);
                }
}  