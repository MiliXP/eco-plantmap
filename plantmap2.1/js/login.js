console.log("JS carregado");

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {

    input.addEventListener("focus", () => {
        input.parentElement.style.transform = "scale(1.02)";
    });

    input.addEventListener("blur", () => {
        input.parentElement.style.transform = "scale(1)";
    });

});

const form = document.getElementById("loginForm");

if(form){

    form.addEventListener("submit", function(event){

        event.preventDefault();

        const email = document.getElementById("email").value.trim();
        const senha = document.getElementById("senha").value.trim();

        if(
            email === "santosmiliane401@gmail.com" &&
            senha === "inovatech2026"
        ){

            window.location.href = "mapa.html";

        }else{

            alert("E-mail ou senha incorretos!");

        }

    });

}