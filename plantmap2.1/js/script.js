/* ============================================================
   MODO ESCURO DA TELA INICIAL
============================================================ */
function gerenciarDarkMode() {
    const toggle = document.getElementById("toggleDark");
    if (!toggle) return;

    // Evento de clique para alternar
    toggle.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark");
        
        // Salva a escolha do usuário
        localStorage.setItem("darkMode", isDark ? "ativo" : "inativo");
        
        // Atualiza o ícone do botão
        toggle.textContent = isDark ? "☀️" : "🌙"; 
    });
}

gerenciarDarkMode();


// ============================================================
// ANIMAÇÃO DOS INPUTS
// ============================================================

const inputs = document.querySelectorAll("input");

inputs.forEach(input => {

    input.addEventListener("focus", () => {

        input.parentElement.style.transform = "scale(1.02)";

    });

    input.addEventListener("blur", () => {

        input.parentElement.style.transform = "scale(1)";

    });

});

// ============================================================
// LOGIN
// ============================================================

const form = document.getElementById("loginForm");

if(form){

    form.addEventListener("submit", function(event){

        event.preventDefault();

        const email =
            document.getElementById("email").value.trim();

        const senha =
            document.getElementById("senha").value.trim();

        // LOGIN
        if(

            email === "santosmiliane401@gmail.com" &&
            senha === "inovatech2026"

        ){

            // REDIRECIONA PARA O MAPA
            window.location.href = "mapa.html";

        }else{

            alert("E-mail ou senha incorretos!");

        }

    });

}

// ============================================================
// VERIFICA SE EXISTE MAPA
// ============================================================

const mapaElemento = document.getElementById("mapa");

if(mapaElemento){

    // ============================================================
    // MAPA PRINCIPAL
    // ============================================================

    const mapa = L.map('mapa')
    .setView([-3.1190, -60.0217], 12);

    // ============================================================
    // OPEN STREET MAP
    // ============================================================

    L.tileLayer(
        'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
        {

            attribution: '&copy; OpenStreetMap',

            maxZoom: 19

        }

    ).addTo(mapa);

    // ============================================================
    // ÍCONE PERSONALIZADO
    // ============================================================

    const iconeReciclagem = L.icon({

        iconUrl:
        'https://cdn-icons-png.flaticon.com/512/1048/1048953.png',

        iconSize: [35, 35],

        iconAnchor: [17, 35],

        popupAnchor: [0, -35]

    });

    // ============================================================
    // ARRAY DE MARCADORES
    // ============================================================

    const marcadores = [];

    // ============================================================
    // FUNÇÃO PARA ADICIONAR PONTOS
    // ============================================================

    function adicionarPonto(
        latitude,
        longitude,
        titulo,
        descricao
    ){

        const marcador = L.marker(

            [latitude, longitude],

            {
                icon: iconeReciclagem
            }

        )

        .addTo(mapa)

        .bindPopup(`

            <div style="padding: 5px;">

                <strong>${titulo}</strong><br><br>

                ${descricao}

            </div>

        `);

        marcadores.push(marcador);

    }

    // ============================================================
    // PONTOS DE RECICLAGEM
    // ============================================================

    // AMAZONAS SHOPPING
    adicionarPonto(

        -3.1022,
        -60.0250,

        "♻ Amazonas Shopping",

        `
        📍 Av. Djalma Batista, 482<br><br>

        Coleta de eletrônicos,
        pilhas e recicláveis.
        `
    );

    // BEMOL CIDADE NOVA
    adicionarPonto(

        -3.0367,
        -59.9830,

        "💻 Bemol Cidade Nova",

        `
        📍 Av. Noel Nutels, 1762<br><br>

        Coleta de eletrônicos
        e acessórios.
        `
    );

    // BEMOL GRANDE CIRCULAR
    adicionarPonto(

        -3.0410,
        -59.9585,

        "💻 Bemol Grande Circular",

        `
        📍 Av. Autaz Mirim, 6100<br><br>

        Recebimento de resíduos eletrônicos.
        `
    );

    // BEMOL PONTA NEGRA
    adicionarPonto(

        -3.0885,
        -60.1030,

        "💻 Bemol Ponta Negra",

        `
        📍 Av. Coronel Teixeira, 5705<br><br>

        Coleta seletiva e eletrônicos.
        `
    );

    // SEMULSP
    adicionarPonto(

        -3.1038,
        -60.0715,

        "🏢 SEMULSP - Compensa",

        `
        📍 Av. Compensa, 1335<br>
        Compensa - Manaus/AM<br><br>

        Linha branca
        e grandes volumes.
        `
    );

    // ARPA
    adicionarPonto(

        -3.1190,
        -59.9400,

        "♻ Associação ARPA",

        `
        📍 Av. Flamboyant, 312<br><br>

        Triagem e reciclagem.
        `
    );

    // CALMA
    adicionarPonto(

        -3.1180,
        -59.9445,

        "♻ Cooperativa CALMA",

        `
        📍 Rua Abel Salazar, 47<br><br>

        Coleta seletiva.
        `
    );

    // COOPECAMARE
    adicionarPonto(

        -3.0415,
        -59.9385,

        "♻ COOPECAMARE",

        `
        📍 Av. Itaúba, 31<br><br>

        Cooperativa de recicláveis.
        `
    );

    // COOPERNORTE
    adicionarPonto(

        -3.1298,
        -60.0025,

        "♻ COOPERNORTE",

        `
        📍 Rua Delfim de Souza, 68<br><br>

        Separação e coleta.
        `
    );

    // DOROTHY STANG
    adicionarPonto(

        -2.9960,
        -59.9925,

        "🌱 Instituto Dorothy Stang",

        `
        📍 Rua João Pessoa, 392<br><br>

        Educação ambiental.
        `
    );

    // ============================================================
    // ÁREA DE COBERTURA
    // ============================================================

    L.circle([-3.1190, -60.0217], {

        color: '#1b7925',

        fillColor: '#2ecc71',

        fillOpacity: 0.15,

        radius: 8500

    })

    .addTo(mapa)

    .bindPopup("🌎 Área monitorada pelo EcoMap Manaus");

    // ============================================================
    // AJUSTAR MAPA PARA MOSTRAR TODOS OS PONTOS
    // ============================================================

    const grupo = L.featureGroup(marcadores);

    mapa.fitBounds(grupo.getBounds());

    // ============================================================
    // LOCALIZAÇÃO DO USUÁRIO
    // ============================================================

    navigator.geolocation.getCurrentPosition(

        (posicao) => {

            const latitude =
                posicao.coords.latitude;

            const longitude =
                posicao.coords.longitude;

            L.marker(

                [latitude, longitude]

            )

            .addTo(mapa)

            .bindPopup("📍 Você está aqui!");

        },

        () => {

            console.log(
                "Localização não permitida."
            );

        }

    );

}