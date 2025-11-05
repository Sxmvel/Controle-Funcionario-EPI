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

import com.samuel_resende.controle_funcionario_EPI.Model.EPI;
import com.samuel_resende.controle_funcionario_EPI.Service.EpiService;

@RestController
@RequestMapping("/api/epis") // Endpoint base: /api/epis
public class EpiController {

    @Autowired
    private EpiService epiService;

    // C: CREATE (Salvar Novo EPI)
    // POST /api/epis
    @PostMapping
    public ResponseEntity<EPI> createEPI(@RequestBody EPI epi) {
        EPI novoEpi = epiService.salvar(epi);
        
        if (novoEpi != null) {
            // Retorna o objeto criado com o status 201 CREATED
            return new ResponseEntity<>(novoEpi, HttpStatus.CREATED);
        } else {
            // Retorna 400 BAD REQUEST em caso de falha na validação (ex: CA expirado)
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // R: READ ALL (Buscar Todos os EPIs)
    // GET /api/epis
    @GetMapping
    public ResponseEntity<List<EPI>> getAllEPIs() {
        List<EPI> epis = epiService.buscarTodos();
        return new ResponseEntity<>(epis, HttpStatus.OK);
    }

    // R: READ ONE (Buscar EPI por ID)
    // GET /api/epis/{id}
    @GetMapping("/{id}")
    public ResponseEntity<EPI> getEPIById(@PathVariable Long id) {
        Optional<EPI> epi = epiService.buscarPorId(id);
        
        if (epi.isPresent()) {
            return new ResponseEntity<>(epi.get(), HttpStatus.OK);
        } else {
            // Retorna 404 NOT FOUND se o recurso não for encontrado
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // U: UPDATE (Atualizar EPI por ID)
    // PUT /api/epis/{id}
    @PutMapping("/{id}")
    public ResponseEntity<EPI> updateEPI(@PathVariable Long id, @RequestBody EPI epiDetalhes) {
        EPI epiAtualizado = epiService.atualizar(id, epiDetalhes);
        
        if (epiAtualizado != null) {
            return new ResponseEntity<>(epiAtualizado, HttpStatus.OK);
        } else {
            // Retorna 404 NOT FOUND se o ID não existir
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // D: DELETE (Deletar EPI por ID)
    // DELETE /api/epis/{id}
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEPI(@PathVariable Long id) {
        boolean deletado = epiService.deletar(id);
        
        if (deletado) {
            // Retorna 204 NO CONTENT
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            // Retorna 404 NOT FOUND se o ID não existir
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}