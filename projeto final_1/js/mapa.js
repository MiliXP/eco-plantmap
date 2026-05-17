/* =========================
   DARK MODE GLOBAL
========================= */

const btnTema = document.getElementById("toggleDark");

function carregarTema() {
    const temaSalvo = localStorage.getItem("tema");

    if (temaSalvo === "dark") {
        document.body.classList.add("dark");

        if (btnTema) {
            btnTema.textContent = "☀️";
        }
    } else {
        document.body.classList.remove("dark");

        if (btnTema) {
            btnTema.textContent = "🌙";
        }
    }
}

function alternarTema() {
    document.body.classList.toggle("dark");

    const modoDark = document.body.classList.contains("dark");

    localStorage.setItem("tema", modoDark ? "dark" : "light");

    if (btnTema) {
        btnTema.textContent = modoDark ? "☀️" : "🌙";
    }
}

if (btnTema) {
    btnTema.addEventListener("click", alternarTema);
}

/* =========================
   BOTÃO VOLTAR
========================= */

const btnVoltar = document.getElementById("btnVoltar");

if (btnVoltar) {
    btnVoltar.addEventListener("click", () => {
        window.location.href = "feed.html";
    });
}

/* =========================
   MAPA INICIALIZAÇÃO
========================= */

const mapa = L.map("mapa").setView([-3.1190, -60.0217], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; OpenStreetMap",
    maxZoom: 19
}).addTo(mapa);

/* =========================
   ÍCONE PERSONALIZADO
========================= */

const iconeEletronico = L.icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/1048/1048953.png",
    iconSize: [35, 35]
});

/* =========================
   MARCADORES
========================= */

const marcadorAmazonas = L.marker([-3.1022, -60.0250], { icon: iconeEletronico })
    .addTo(mapa)
    .bindPopup(`
        <strong>🛍 Amazonas Shopping</strong><br><br>
        📍 Av. Djalma Batista, 482<br>
        Chapada - Manaus/AM<br><br>
        ♻ Recebimento de recicláveis e eletrônicos portáteis.
    `);

const marcadorBemol = L.marker([-3.0415, -59.9580], { icon: iconeEletronico })
    .addTo(mapa)
    .bindPopup(`
        <strong>💻 Bemol Grande Circular</strong><br><br>
        📍 Av. Autaz Mirim, 6100<br>
        Manaus/AM<br><br>
        ♻ Coleta de celulares, teclados e eletrônicos.
    `);

const marcadorSemulsp = L.marker([-3.1038, -60.0715])
    .addTo(mapa)
    .bindPopup(`
        <strong>🏢 SEMULSP - Compensa</strong><br><br>
        📍 Av. Compensa, 1335<br>
        Compensa - Manaus/AM<br><br>
        ♻ Descarte de grandes volumes, linha branca e resíduos recicláveis.
    `);

/* =========================
   ÁREA DE COBERTURA
========================= */

L.circle([-3.1190, -60.0217], {
    color: "#1b7925",
    fillColor: "#2ecc71",
    fillOpacity: 0.10,
    radius: 8500
}).addTo(mapa).bindPopup("🌎 Área monitorada pelo EcoMap Manaus");

/* =========================
   REDIRECIONAMENTO DOS CARDS
========================= */

const cards = document.querySelectorAll(".card-ponto");

cards.forEach(card => {
    card.addEventListener("click", () => {
        const latitude = parseFloat(card.dataset.lat);
        const longitude = parseFloat(card.dataset.lng);
        const marker = card.dataset.marker;

        mapa.flyTo([latitude, longitude], 16, { duration: 2 });

        if (marker === "amazonas") {
            marcadorAmazonas.openPopup();
        } else if (marker === "bemol") {
            marcadorBemol.openPopup();
        } else if (marker === "semulsp") {
            marcadorSemulsp.openPopup();
        }
    });
});

/* =========================
   INICIAR
========================= */

carregarTema();