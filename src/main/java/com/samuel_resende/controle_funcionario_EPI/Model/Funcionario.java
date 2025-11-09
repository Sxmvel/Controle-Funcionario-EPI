package com.samuel_resende.controle_funcionario_EPI.Model;

import java.time.LocalDate;
import java.util.List;
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


@Data // Lombok para gerar getter e setter
@Entity // Anotacao JPA para mapear a classe como entidade
@JsonIgnoreProperties({"entregas"})

@Table(name = "Funcionario")

public class Funcionario {

    // atributos da entidade funcionario.
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id_funcionario;

    // Coluna para o nome do funcionário
    @Column(nullable = false, length = 100)
    private String nome;

    // Coluna para o CPF (Unique e Not Null)
    @Column(nullable = false, length = 14, unique = true)
    private String cpf;

    // Coluna para a Matrícula (Unique e Not Null)
    @Column(nullable = false, length = 20, unique = true)
    private String matricula;

    // Coluna para a Função/Cargo
    @Column(nullable = false, length = 50)
    private String funcao;

    // Coluna para a Data de Contratação
    @Column(name = "data_contratacao")
    private LocalDate dataContratacao; // Usamos LocalDate para mapear o tipo DATE do SQL

    @OneToMany(mappedBy = "funcionario", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    @ToString.Exclude // <--- NOVO: Evita recursão no toString()
    private List<EntregaEPI> entregas;

}
