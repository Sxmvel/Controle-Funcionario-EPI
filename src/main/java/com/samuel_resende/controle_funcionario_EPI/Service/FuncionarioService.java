package com.samuel_resende.controle_funcionario_EPI.Service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.samuel_resende.controle_funcionario_EPI.Model.Funcionario;
import com.samuel_resende.controle_funcionario_EPI.Repository.FuncionarioRepository;

@Service 
public class FuncionarioService {

    @Autowired
    private FuncionarioRepository funcionarioRepository;


    // C: CREATE (Criar/Salvar)
    @Transactional 
    public Funcionario salvar(Funcionario funcionario) {

        return funcionarioRepository.save(funcionario); // Salva no banco
    }

    // R: READ ALL
    public List<Funcionario> buscarTodos() {
        return funcionarioRepository.findAll();
    }

   
    // R: READ (Ler)
    public Optional<Funcionario> buscarPorId(Long id) {
        return funcionarioRepository.findById(id);
    }

    // U: UPDATE (Atualizar)
    @Transactional
    public Funcionario atualizar(Long id, Funcionario funcionarioDetalhes) {
        // Busca o funcionário existente
        Optional<Funcionario> funcionarioExistente = funcionarioRepository.findById(id);
        
        if (funcionarioExistente.isPresent()) {
            Funcionario funcionario = funcionarioExistente.get();
            
            // Atualiza apenas os campos permitidos
            funcionario.setNome(funcionarioDetalhes.getNome());
            funcionario.setFuncao(funcionarioDetalhes.getFuncao());
 
            return funcionarioRepository.save(funcionario);
        } else {
            System.err.println("FUNCIONARIO NAO ENCONTRADO!!!!");
            return null; 
        }
    }

    // D: DELETE (Excluir)
    @Transactional
    public boolean deletar(Long id) {
        if (funcionarioRepository.existsById(id)) {
            funcionarioRepository.deleteById(id);
            return true;
        }
        return false;
    }
}