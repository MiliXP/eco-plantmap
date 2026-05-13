// Função simples para o "Like"
function likePost(element) {
    element.classList.toggle('fas'); // Coração preenchido
    element.classList.toggle('far'); // Coração vazio
    if(element.classList.contains('fas')) {
        element.style.color = '#e74c3c';
    } else {
        element.style.color = 'inherit';
    }
}

// Logica para scroll (opcional)
window.addEventListener('scroll', () => {
    // Pode adicionar efeitos no header ao rolar
});