/* =========================
   DARK MODE GLOBAL
========================= */
const btnTema = document.getElementById("btnTema");

function carregarTema() {

    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "dark") {

        document.body.classList.add("dark");

        if (btnTema) {
            btnTema.textContent = "☀︎︎";
        }

    } else {

        document.body.classList.remove("dark");

        if (btnTema) {
            btnTema.textContent = "⏾";
        }

    }
}

function alternarTema() {

    document.body.classList.toggle("dark");

    const modoDark = document.body.classList.contains("dark");

    localStorage.setItem(
        "tema",
        modoDark ? "dark" : "light"
    );

    if (btnTema) {
        btnTema.textContent = modoDark ? "☀︎︎" : "⏾";
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

        const email = document.getElementById("email").value.trim().toLowerCase();
        const senha = document.getElementById("senha").value.trim();

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
   MAPA
========================= */

const mapaElemento = document.getElementById("mapa");

if (mapaElemento) {
    const mapa = L.map("mapa").setView([-3.1190, -60.0217], 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap",
        maxZoom: 19
    }).addTo(mapa);

    const iconeReciclagem = L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
        iconSize: [35, 35],
        iconAnchor: [17, 35],
        popupAnchor: [0, -35]
    });

    const marcadores = [];

    function adicionarPonto(latitude, longitude, titulo, descricao) {
        const marcador = L.marker([latitude, longitude], {
            icon: iconeReciclagem
        })
        .addTo(mapa)
        .bindPopup(`
            <div style="padding: 5px;">
                <strong>${titulo}</strong><br><br>
                ${descricao}
            </div>
        `);

        marcadores.push(marcador);
    }

    adicionarPonto(-3.1022, -60.0250, "♻ Amazonas Shopping", `
        📍 Av. Djalma Batista, 482<br><br>
        Coleta de eletrônicos, pilhas e recicláveis.
    `);

    adicionarPonto(-3.0367, -59.9830, "💻 Bemol Cidade Nova", `
        📍 Av. Noel Nutels, 1762<br><br>
        Coleta de eletrônicos e acessórios.
    `);

    adicionarPonto(-3.0410, -59.9585, "💻 Bemol Grande Circular", `
        📍 Av. Autaz Mirim, 6100<br><br>
        Recebimento de resíduos eletrônicos.
    `);

    adicionarPonto(-3.0885, -60.1030, "💻 Bemol Ponta Negra", `
        📍 Av. Coronel Teixeira, 5705<br><br>
        Coleta seletiva e eletrônicos.
    `);

    adicionarPonto(-3.1038, -60.0715, "🏢 SEMULSP - Compensa", `
        📍 Av. Compensa, 1335<br>
        Compensa - Manaus/AM<br><br>
        Linha branca e grandes volumes.
    `);

    adicionarPonto(-3.1190, -59.9400, "♻ Associação ARPA", `
        📍 Av. Flamboyant, 312<br><br>
        Triagem e reciclagem.
    `);

    adicionarPonto(-3.1180, -59.9445, "♻ Cooperativa CALMA", `
        📍 Rua Abel Salazar, 47<br><br>
        Coleta seletiva.
    `);

    adicionarPonto(-3.0415, -59.9385, "♻ COOPECAMARE", `
        📍 Av. Itaúba, 31<br><br>
        Cooperativa de recicláveis.
    `);

    adicionarPonto(-3.1298, -60.0025, "♻ COOPERNORTE", `
        📍 Rua Delfim de Souza, 68<br><br>
        Separação e coleta.
    `);

    adicionarPonto(-2.9960, -59.9925, "🌱 Instituto Dorothy Stang", `
        📍 Rua João Pessoa, 392<br><br>
        Educação ambiental.
    `);

    L.circle([-3.1190, -60.0217], {
        color: "#1b7925",
        fillColor: "#2ecc71",
        fillOpacity: 0.15,
        radius: 8500
    })
    .addTo(mapa)
    .bindPopup("🌎 Área monitorada pelo EcoMap Manaus");

    const grupo = L.featureGroup(marcadores);
    mapa.fitBounds(grupo.getBounds());

    navigator.geolocation.getCurrentPosition(
        (posicao) => {
            const latitude = posicao.coords.latitude;
            const longitude = posicao.coords.longitude;

            L.marker([latitude, longitude])
                .addTo(mapa)
                .bindPopup("📍 Você está aqui!");
        },
        () => {
            console.log("Localização não permitida.");
        }
    );
}

/* =========================
   INICIAR
========================= */

carregarTema();