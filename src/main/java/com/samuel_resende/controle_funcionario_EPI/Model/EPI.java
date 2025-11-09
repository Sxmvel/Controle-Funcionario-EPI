package com.samuel_resende.controle_funcionario_EPI.Model;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.ToString;


@Data 
@Entity // JPA mapeia a classe como entidade do banco de dados 
@Table(name = "EPI")
@JsonIgnoreProperties({"entregas"})
public class EPI {


    // Chave Primária (PK)
    @Id
    // Define em auto incremento de geração de IDs 
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_epi;

    // Coluna para o tipo de EPI (Ex: Capacete, Luva)
    @Column(name = "tipo_epi", nullable = false, length = 100)
    private String tipoEpi;

    // Coluna para o código de referência ou modelo (pode ser Nullable, mas Unique)
    @Column(name = "codigo_referencia", length = 50, unique = true)
    private String codigoReferencia;

    // Coluna para o Número do Certificado de Aprovação (Crucial e Único)
    @Column(name = "numero_ca", nullable = false, length = 20, unique = true)
    private String numeroCa;

    // Coluna para a Data de Validade do Certificado de Aprovação
    @Column(name = "data_validade_ca")
    private LocalDate dataValidadeCa; 

    @OneToMany(mappedBy = "epi", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude 
    private List<EntregaEPI> entregas;
    
}