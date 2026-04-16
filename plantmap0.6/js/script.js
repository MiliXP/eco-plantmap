/* ============================================================
   1. FUNÇÕES DE LÓGICA DO SISTEMA
============================================================ */

/**
 * Ordena as linhas da tabela de ranking com base na quantidade
 */
function ordenarRanking() {
    const tabela = document.querySelector("#tabela-ranking tbody");
    if (!tabela) return;

    const linhas = Array.from(tabela.querySelectorAll("tr"));

    // Ordenação decrescente (maior para o menor)
    linhas.sort((a, b) => {
        const valorA = parseInt(a.querySelector(".quantidade").textContent.replace(/\D/g, "")) || 0;
        const valorB = parseInt(b.querySelector(".quantidade").textContent.replace(/\D/g, "")) || 0;
        return valorB - valorA;
    });

    // Limpa a tabela para reinserir as linhas ordenadas
    tabela.innerHTML = "";

    linhas.forEach((linha, index) => {
        // Reseta classes de destaque
        linha.classList.remove("primeiro");

        // Atualiza o número da posição (coluna 0)
        linha.children[0].textContent = `${index + 1}º`;

        // Aplica destaque ao primeiro lugar
        if (index === 0) {
            linha.classList.add("primeiro");
        }

        tabela.appendChild(linha);
    });
}

/**
 * Gerencia o estado e persistência do Dark Mode
 */
function gerenciarDarkMode() {
    const toggle = document.getElementById("toggleDark");
    if (!toggle) return;

    // 1. Verifica preferência salva no localStorage ao carregar
    if (localStorage.getItem("darkMode") === "ativo") {
        document.body.classList.add("dark");
        toggle.textContent = "☀️"; // Ícone de sol se estiver escuro
    }

    // 2. Evento de clique para alternar
    toggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        
        // Salva a escolha do usuário
        localStorage.setItem("darkMode", isDark ? "ativo" : "inativo");
        
        // Atualiza o ícone do botão
        toggle.textContent = isDark ? "☀️" : "🌙";
    });
}

/* ============================================================
   2. INICIALIZAÇÃO (EVENT LISTENERS)
============================================================ */

document.addEventListener("DOMContentLoaded", () => {
    
    // Executa a ordenação inicial do ranking
    ordenarRanking();

    // Inicializa o Dark Mode
    gerenciarDarkMode();

    // Configuração de Navegação (Botão Mapa)
    const btnMapa = document.getElementById("btnMapa");
    if (btnMapa) {
        btnMapa.addEventListener("click", () => {
            window.location.href = "mapa.html";
        });
    }

});