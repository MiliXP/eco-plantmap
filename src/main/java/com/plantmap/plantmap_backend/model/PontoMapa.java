/* model é a pasta que representa os dados do programa, exemplo:
Usuario, tipo (Tipo de ping), latitude, longitude, data do dia
*/
package com.plantmap.plantmap_backend.model;
import jakarta.persistence.*;
import java.time.LocalDateTime;
//@Entity: diz ao Spring Boot que isso é uma tabela no banco de dados (BD)
@Entity
@Table(name = "pontos_mapa")
public class PontoMapa {
    //@Id: Chave primario
    @Id
    //@GeneratedValue: o banco cria o ID automaticamente
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String tipo;
    private double latitude;
    private double longitude;
    private String descricao;
    private final LocalDateTime dataCriacao =LocalDateTime.now();

    public PontoMapa() {}
    public Long getID() {
        return id;
    }
    public String getNome() {

        return nome;
    }
    public void setNome(String nome) {

        this.nome = nome;
    }
    public String getTipo() {

        return tipo;
    }
    public void setTipo (String tipo) {

        this.tipo = tipo;
    }
    public double getLatitude() {

        return latitude;
    }
    public void setLatitude(double latitude) {

        this.latitude = latitude;
    }
    public double  getLongitude() {

        return longitude;
    }
    public void setLogitude(double longitude) {

        this.longitude = longitude;
    }
    public String getDescricao() {

        return descricao;
    }
    public void setDescricao(String descricao) {

        this.descricao = descricao;
    }
    public LocalDateTime getDataCriacao(){
        return getDataCriacao();
    }
}