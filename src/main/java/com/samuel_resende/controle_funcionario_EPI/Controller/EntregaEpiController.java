package com.samuel_resende.controle_funcionario_EPI.Controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin; // NOVO: Para permissão CORS
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.samuel_resende.controle_funcionario_EPI.Model.EntregaEPI;
import com.samuel_resende.controle_funcionario_EPI.Service.EntregaEpiService;

@RestController
@RequestMapping("/api/entregas") // Endpoint base: /api/entregas
// NOVO: Adiciona a permissão CORS diretamente no Controller para o Frontend
@CrossOrigin(origins = {"http://localhost:5173", "http://127.0.0.1:5173"}) 
public class EntregaEpiController {

    @Autowired
    private EntregaEpiService entregaEpiService;

    // -----------------------------------------------------------------
    // CRUD BÁSICO (C, R, U, D)
    // -----------------------------------------------------------------

    // C: CREATE (POST /api/entregas)
    @PostMapping
    public ResponseEntity<EntregaEPI> registrarEntrega(@RequestBody EntregaEPI entregaEPI) {
        EntregaEPI novaEntrega = entregaEpiService.registrarEntrega(entregaEPI);
        
        if (novaEntrega != null) {
            return new ResponseEntity<>(novaEntrega, HttpStatus.CREATED);
        } else {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    // R: READ ALL (GET /api/entregas)
    @GetMapping
    public ResponseEntity<List<EntregaEPI>> getAllEntregas() {
        List<EntregaEPI> entregas = entregaEpiService.buscarTodas();
        return new ResponseEntity<>(entregas, HttpStatus.OK);
    }

    // R: READ ONE (GET /api/entregas/{id})
    @GetMapping("/{id}")
    public ResponseEntity<EntregaEPI> getEntregaById(@PathVariable Long id) {
        Optional<EntregaEPI> entrega = entregaEpiService.buscarPorId(id);
        
        if (entrega.isPresent()) {
            return new ResponseEntity<>(entrega.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // U: UPDATE (PUT /api/entregas/{id})
    @PutMapping("/{id}")
    public ResponseEntity<EntregaEPI> updateEntrega(@PathVariable Long id, @RequestBody EntregaEPI detalhes) {
        EntregaEPI entregaAtualizada = entregaEpiService.atualizar(id, detalhes);
        
        if (entregaAtualizada != null) {
            return new ResponseEntity<>(entregaAtualizada, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // D: DELETE (DELETE /api/entregas/{id})
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteEntrega(@PathVariable Long id) {
        boolean deletado = entregaEpiService.deletar(id);
        
        if (deletado) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
    
  
    @GetMapping("/historico/funcionario/{idFuncionario}")
    public ResponseEntity<List<EntregaEPI>> getHistoricoByFuncionario(@PathVariable Long idFuncionario) {
        List<EntregaEPI> historico = entregaEpiService.buscarHistoricoPorFuncionario(idFuncionario);
        
        if (historico.isEmpty()) {
            // Retorna 404 se não houver registros (o que é normal se não houver entregas)
            return new ResponseEntity<>(HttpStatus.NOT_FOUND); 
        }
        return new ResponseEntity<>(historico, HttpStatus.OK);
    }
}
