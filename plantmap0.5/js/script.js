function ordenarRanking() {
    const tabela = document.querySelector("#tabela-ranking tbody");

    if (!tabela) return; 
    const linhas = Array.from(tabela.querySelectorAll("tr"));

    linhas.sort((a, b) => {
        const valorA = parseInt(a.querySelector(".quantidade").textContent.replace(/\D/g, "")) || 0;
        const valorB = parseInt(b.querySelector(".quantidade").textContent.replace(/\D/g, "")) || 0;
        return valorB - valorA;
    });

    tabela.innerHTML = "";

    linhas.forEach((linha, index) => {
        linha.classList.remove("primeiro");

        linha.children[0].textContent = index + 1;

        if (index === 0) {
            linha.classList.add("primeiro");
        }

        tabela.appendChild(linha);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    
    // =========================
    // ORDENA O RANKING
    ordenarRanking();

    // =========================
    // BOTÃO IR PARA O MAPA
    const btnMapa = document.getElementById("btnMapa");

    if (btnMapa) {
        btnMapa.addEventListener("click", function () {
            window.location.href = "mapa.html";
        });
    }

    // =========================
    // DARK MODE (COM SALVAMENTO)
    const toggle = document.getElementById("toggleDark");

    // verifica se já tinha preferência salva
    if (localStorage.getItem("darkMode") === "ativo") {
        document.body.classList.add("dark");
    }

    if (toggle) {
        toggle.addEventListener("click", function () {
            document.body.classList.toggle("dark");

            // salva no navegador
            if (document.body.classList.contains("dark")) {
                localStorage.setItem("darkMode", "ativo");
            } else {
                localStorage.setItem("darkMode", "inativo");
            }
        });
    }

});