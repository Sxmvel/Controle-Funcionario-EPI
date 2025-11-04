package com.samuel_resende.controle_funcionario_EPI.Model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table(name = "EntregaEPI")
public class EntregaEPI {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_entrega;

    @ManyToOne
    @JoinColumn(name = "id_funcionario", nullable = false) // Mapeia a chave estrangeira 'id_funcionario'
    private Funcionario funcionario; // Objeto Funcionario que recebeu o EPI

    @ManyToOne
    @JoinColumn(name = "id_epi", nullable = false) // Mapeia a chave estrangeira 'id_epi'
    private EPI epi; // Objeto EPI que foi entregue

    @Column(name = "data_entrega", nullable = false)
    private LocalDate dataEntrega;

    @Column(nullable = false)
    private Integer quantidade = 1;

    @Column(name = "data_vencimento_epi")
    private LocalDate dataVencimentoEpi; // Vencimento do ITEM entregue (se aplicável)
}
