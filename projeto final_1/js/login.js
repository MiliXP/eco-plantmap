console.log("JS carregado");

/* =========================
   DARK MODE GLOBAL
========================= */

const btnTema = document.getElementById("btnTema");

function carregarTema() {
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "dark") {
        document.body.classList.add("dark");

        if (btnTema) {
            btnTema.textContent = "☀️";
        }
    } else {
        document.body.classList.remove("dark");

        if (btnTema) {
            btnTema.textContent = "🌙";
        }
    }
}

function alternarTema() {
    document.body.classList.toggle("dark");

    const modoDark = document.body.classList.contains("dark");

    localStorage.setItem("tema", modoDark ? "dark" : "light");

    if (btnTema) {
        btnTema.textContent = modoDark ? "☀️" : "🌙";
    }
}

if (btnTema) {
    btnTema.addEventListener("click", alternarTema);
}

/* =========================
   INPUTS ANIMADOS
========================= */

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {
    input.addEventListener("focus", () => {
        input.parentElement.style.transform = "scale(1.02)";
    });

    input.addEventListener("blur", () => {
        input.parentElement.style.transform = "scale(1)";
    });
});

/* =========================
   LOGIN
========================= */

const form = document.getElementById("loginForm");

if (form) {
    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document
            .getElementById("email")
            .value
            .trim()
            .toLowerCase();

        const senha = document
            .getElementById("senha")
            .value
            .trim();

        if (
            email === "inovatech2026@gmail.com" &&
            senha === "inovatech2026"
        ) {
            window.location.href = "feed.html";
        } else {
            alert("E-mail ou senha incorretos!");
        }
    });
}

/* =========================
   MOSTRAR / ESCONDER SENHA
========================= */

const toggleSenha = document.getElementById("toggleSenha");
const inputSenha = document.getElementById("senha");

if (toggleSenha && inputSenha) {
    toggleSenha.addEventListener("click", () => {
        if (inputSenha.type === "password") {
            inputSenha.type = "text";

            toggleSenha.innerHTML =
                '<i class="fa-solid fa-eye-slash"></i>';
        } else {
            inputSenha.type = "password";

            toggleSenha.innerHTML =
                '<i class="fa-solid fa-eye"></i>';
        }
    });
}

/* =========================
   INICIAR
========================= */

carregarTema();