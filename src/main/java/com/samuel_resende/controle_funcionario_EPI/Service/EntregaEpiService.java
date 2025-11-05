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
    private FuncionarioRepository funcionarioRepository; // Necessário para validação

    @Autowired
    private EpiRepository epiRepository; // Necessário para validação

    
    // C: CREATE (Registrar Entrega)
  
    @Transactional
    public EntregaEPI registrarEntrega(EntregaEPI entregaEPI) {

        
        // Verifica se o Funcionário existe
        Long idFuncionario = entregaEPI.getFuncionario().getId_funcionario();
        if (!funcionarioRepository.existsById(idFuncionario)) {
            //Se nn existir retorna erro. 
             System.err.println("Erro: Funcionário com ID " + idFuncionario + " não encontrado.");
             return null; 
        }

        // Verifica se o EPI existe
        Long idEPi = entregaEPI.getEpi().getId_epi();
        if (!epiRepository.existsById(idEPi)) {
             System.err.println("Erro: EPI com ID " + idEPi + " não encontrado.");
             return null;
        }

        // Verifica se a quantidade é válida
        if (entregaEPI.getQuantidade() <= 0) {
             System.err.println("Erro: Quantidade de EPIs deve ser maior que zero.");
             return null;
        }

        // Se as validações passarem, salva o registro
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
            
            // Permite alterar a data, a quantidade e o vencimento do item.
            entrega.setDataEntrega(detalhes.getDataEntrega());
            entrega.setQuantidade(detalhes.getQuantidade());
            entrega.setDataVencimentoEpi(detalhes.getDataVencimentoEpi());
            
            // Não eh possivel a alteração de Funcionario ou EPI (FK) após o registro inicial.
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
}