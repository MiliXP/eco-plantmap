// Script para interações futuras
document.addEventListener('DOMContentLoaded', () => {
    console.log("PlantMap Profile carregado com sucesso! 🌿");

    const btnPrimary = document.querySelector('.btn-primary');
    
    btnPrimary.addEventListener('click', () => {
        alert("Abrindo câmera para mapear nova planta...");
    });

    // Efeito de hover dinâmico nos stats
    const stats = document.querySelectorAll('.stat-card');
    stats.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.borderColor = '#2ecc71';
        });
        card.addEventListener('mouseleave', () => {
            card.style.borderColor = 'rgba(46, 204, 113, 0.2)';
        });
    });
});