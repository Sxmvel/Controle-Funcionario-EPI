package com.samuel_resende.controle_funcionario_EPI.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.samuel_resende.controle_funcionario_EPI.Model.Funcionario;
import com.samuel_resende.controle_funcionario_EPI.Service.FuncionarioService;

@RestController 
@RequestMapping("/api/funcionarios") 
public class FuncionarioController {

    @Autowired
    private FuncionarioService funcionarioService;

    // C: CREATE 
    @PostMapping
    public ResponseEntity<Funcionario> createFuncionario(@RequestBody Funcionario funcionario) {
        Funcionario novoFuncionario = funcionarioService.salvar(funcionario);
        
        if (novoFuncionario != null) {
            // Retorna o objeto criado com o status 201 
            return new ResponseEntity<>(novoFuncionario, HttpStatus.CREATED);
        } else {
            // Retorna 400 BAD REQUEST em caso de falha na validação
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // R: READ 
    @GetMapping
    public ResponseEntity<List<Funcionario>> getAllFuncionarios() {
        List<Funcionario> funcionarios = funcionarioService.buscarTodos();
        return new ResponseEntity<>(funcionarios, HttpStatus.OK);
    }

    // R: READ
    // GET /api/funcionarios/{id}
    @GetMapping("/{id}")
    public ResponseEntity<Funcionario> getFuncionarioById(@PathVariable Long id) {
        Optional<Funcionario> funcionario = funcionarioService.buscarPorId(id);
        
        if (funcionario.isPresent()) {
            return new ResponseEntity<>(funcionario.get(), HttpStatus.OK);
        } else {
            // Retorna 404 NOT FOUND se o recurso não for encontrado
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // U: UPDATE (Atualizar Funcionário por ID)
    // PUT /api/funcionarios/{id}
    @PutMapping("/{id}")
    public ResponseEntity<Funcionario> updateFuncionario(@PathVariable Long id, @RequestBody Funcionario funcionarioDetalhes) {
        Funcionario funcionarioAtualizado = funcionarioService.atualizar(id, funcionarioDetalhes);
     
        if (funcionarioAtualizado != null) {
            return new ResponseEntity<>(funcionarioAtualizado, HttpStatus.OK);
        } else {
            // Retorna 404 NOT FOUND se o ID não existir
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // D: DELETE (Deletar Funcionário por ID)
    // DELETE /api/funcionarios/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFuncionario(@PathVariable Long id) {
        boolean deletado = funcionarioService.deletar(id);
        
        if (deletado) {
            // Retorna 204 NO CONTENT (padrão para exclusão bem-sucedida sem retorno de corpo)
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            // Retorna 404 NOT FOUND se o ID não existir
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}