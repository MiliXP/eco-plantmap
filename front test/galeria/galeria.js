document.addEventListener('DOMContentLoaded', () => {
    const filters = document.querySelectorAll('.filter-btn');
    
    filters.forEach(btn => {
        btn.addEventListener('click', () => {
            // Alterna classe ativa nos botões
            filters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const categoria = btn.innerText;
            console.log(`Filtrando galeria por: ${categoria}`);
            // Aqui você poderia adicionar a lógica de filtro real ocultando os cards
        });
    });

    console.log("Mural de Ações PlantMap pronto para inspirar! 🌿");
});