/* model é a pasta que representa os dados do programa, exemplo:
Usuario, tipo (Tipo de ping), latitude, longitude, data do dia
*/
package com.plantmap.model;
import jakarta.persistence.*;
//@Entity: diz ao Spring Boot que isso é uma tabela no banco de dados (BD)
@Entity
public class arvore {
    //@Id: Chave primario
    @id
    //@GeneratedValue: o banco cria o ID automaticamente
    @GeneratedValue(strategy = GenerationType.INDENTITY)
    private ling id;

    private String usuario;
    private String tipo;
    private double latitude;
    private double longitude;
    private String data;

    public arvore() {}
    public Long getID() {
        return id;
    }
    public String getUsuario() {
        return usuario;
    }
    public void setUsuario(String usuario) {
        this.usuario = usuario;
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
        this.latitude = latitude
    }
    public double  getLongitude() {
        return longitude;
    }
    public void setLogitude(double longitude) {
        this.longitude = longitude;
    }
    public String getData() {
        return data;
    }
    public void setData(String data) {
        this.data = data;
    }
}