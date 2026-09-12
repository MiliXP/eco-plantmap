package com.plantmap.plantmap_backend.controller;

import com.plantmap.plantmap_backend.model.Usuario;
import com.plantmap.plantmap_backend.repository.UsuarioRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {

    private final UsuarioRepository repository;

    public UsuarioController(UsuarioRepository repository) {
        this.repository = repository;
    }

    @PostMapping("/cadastrar")
    public ResponseEntity<?> cadastrar(@RequestBody Usuario usuario) {

        Optional<Usuario> usuarioExistente = repository.findByEmail(usuario.getEmail());

        if (usuarioExistente.isPresent()) {
            return ResponseEntity.badRequest().body(
                    Map.of("message", "Este e-mail já está cadastrado.")
            );
        }

        Usuario salvo = repository.save(usuario);

        return ResponseEntity.ok(salvo);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> dados) {

        String email = dados.get("email");
        String senha = dados.get("senha");

        Optional<Usuario> usuarioOpt = repository.findByEmail(email);

        if (usuarioOpt.isPresent()) {
            Usuario usuario = usuarioOpt.get();

            if (usuario.getSenha().equals(senha)) {
                return ResponseEntity.ok(usuario);
            }
        }

        return ResponseEntity.badRequest().body(
                Map.of("message", "E-mail ou senha inválidos.")
        );
    }
}