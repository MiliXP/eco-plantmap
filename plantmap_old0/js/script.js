function updateCounter(amount) {
    const counterElement = document.getElementById('tree-counter');
    let currentValue = parseInt(counterElement.innerText.replace(',', ''));
    let targetValue = currentValue + amount;
    
    // Animação simples de contagem
    let duration = 500; // ms
    let startTime = null;

    function animation(currentTime) {
        if (!startTime) startTime = currentTime;
        let progress = currentTime - startTime;
        let run = Math.floor(currentValue + (targetValue - currentValue) * (progress / duration));
        
        counterElement.innerText = run.toLocaleString();
        
        if (progress < duration) {
            requestAnimationFrame(animation);
        } else {
            counterElement.innerText = targetValue.toLocaleString();
        }
    }

    requestAnimationFrame(animation);
}