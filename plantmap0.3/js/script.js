function ordenarRanking() {
    const tabela = document.querySelector("#tabela-ranking tbody");
    const linhas = Array.from(tabela.querySelectorAll("tr"));

    // Ordena do MAIOR para o MENOR
    linhas.sort((a, b) => {
        const valorA = parseInt(a.querySelector(".quantidade").textContent);
        const valorB = parseInt(b.querySelector(".quantidade").textContent);
        return valorB - valorA;
    });

    // Limpa a tabela
    tabela.innerHTML = "";

    // Reinsere ordenado
    linhas.forEach((linha, index) => {
        linha.classList.remove("primeiro");

        if (index === 0) {
            linha.classList.add("primeiro"); // adiciona coroa no maior
        }

        tabela.appendChild(linha);
    });
}

// Executa ao carregar a página
ordenarRanking();