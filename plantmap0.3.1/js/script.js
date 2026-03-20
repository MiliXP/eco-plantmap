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
        linha.children[0].textContent = index + 1;

        if (index === 0) {
            linha.classList.add("primeiro");
        }

        tabela.appendChild(linha);
    });
}

document.addEventListener("DOMContentLoaded", ordenarRanking);