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

/* ============================================================
   TOKEN MAPBOX
============================================================ */

mapboxgl.accessToken = 'SUA_MAPBOX_TOKEN';

/* ============================================================
   MAPA PRINCIPAL
============================================================ */

const mapa = new mapboxgl.Map({

    container: 'mapa',

    style: 'mapbox://styles/mapbox/streets-v12',

    center: [-60.0217, -3.1190],

    zoom: 11
});

/* ============================================================
   CONTROLES DE NAVEGAÇÃO
============================================================ */

mapa.addControl(
    new mapboxgl.NavigationControl()
);

/* ============================================================
   FUNÇÃO PARA ADICIONAR PONTOS
============================================================ */

function adicionarPonto(
    longitude,
    latitude,
    titulo,
    descricao,
    cor = "#1b7925"
) {

    // CRIA ELEMENTO
    const marcador = document.createElement('div');

    marcador.style.width = '18px';
    marcador.style.height = '18px';

    marcador.style.borderRadius = '50%';

    marcador.style.background = cor;

    marcador.style.border = '3px solid white';

    marcador.style.boxShadow =
        '0 0 10px rgba(0,0,0,0.3)';

    marcador.style.cursor = 'pointer';

    // POPUP
    const popup = new mapboxgl.Popup({

        offset: 25

    }).setHTML(`

        <div style="padding: 8px;">

            <strong>${titulo}</strong><br><br>

            ${descricao}

        </div>

    `);

    // MARCADOR
    new mapboxgl.Marker(marcador)

        .setLngLat([longitude, latitude])

        .setPopup(popup)

        .addTo(mapa);
}

/* ============================================================
   PONTOS DE RECICLAGEM
============================================================ */

// AMAZONAS SHOPPING
adicionarPonto(

    -60.0250,
    -3.1022,

    "♻ Amazonas Shopping",

    `
    📍 Av. Djalma Batista, 482<br><br>

    Coleta de eletrônicos,
    pilhas e recicláveis.
    `,

    "#1b7925"
);

// BEMOL CIDADE NOVA
adicionarPonto(

    -59.9830,
    -3.0367,

    "💻 Bemol Cidade Nova",

    `
    📍 Av. Noel Nutels, 1762<br><br>

    Coleta de eletrônicos
    e acessórios.
    `,

    "#2563eb"
);

// BEMOL GRANDE CIRCULAR
adicionarPonto(

    -59.9585,
    -3.0410,

    "💻 Bemol Grande Circular",

    `
    📍 Av. Autaz Mirim, 6100<br><br>

    Recebimento de resíduos eletrônicos.
    `,

    "#2563eb"
);

// BEMOL PONTA NEGRA
adicionarPonto(

    -60.1030,
    -3.0885,

    "💻 Bemol Ponta Negra",

    `
    📍 Av. Coronel Teixeira, 5705<br><br>

    Coleta seletiva e eletrônicos.
    `,

    "#2563eb"
);

// SEMULSP
adicionarPonto(

    -60.0715,
    -3.1038,

    "🏢 SEMULSP - Compensa",

    `
    📍 Av. Compensa, 1335<br>
    Compensa - Manaus/AM<br><br>

    Linha branca
    e grandes volumes.
    `,

    "#dc2626"
);

// ARPA
adicionarPonto(

    -59.9400,
    -3.1190,

    "♻ Associação ARPA",

    `
    📍 Av. Flamboyant, 312<br><br>

    Triagem e reciclagem.
    `,

    "#16a34a"
);

// CALMA
adicionarPonto(

    -59.9445,
    -3.1180,

    "♻ Cooperativa CALMA",

    `
    📍 Rua Abel Salazar, 47<br><br>

    Coleta seletiva.
    `,

    "#16a34a"
);

// COOPECAMARE
adicionarPonto(

    -59.9385,
    -3.0415,

    "♻ COOPECAMARE",

    `
    📍 Av. Itaúba, 31<br><br>

    Cooperativa de recicláveis.
    `,

    "#16a34a"
);

// COOPERNORTE
adicionarPonto(

    -60.0025,
    -3.1298,

    "♻ COOPERNORTE",

    `
    📍 Rua Delfim de Souza, 68<br><br>

    Separação e coleta.
    `,

    "#16a34a"
);

// DOROTHY STANG
adicionarPonto(

    -59.9925,
    -2.9960,

    "🌱 Instituto Dorothy Stang",

    `
    📍 Rua João Pessoa, 392<br><br>

    Educação ambiental.
    `,

    "#22c55e"
);

/* ============================================================
   ÁREA DE COBERTURA
============================================================ */

mapa.on('load', () => {

    mapa.addSource('area-eco', {

        type: 'geojson',

        data: {

            type: 'Feature',

            geometry: {

                type: 'Point',

                coordinates: [-60.0217, -3.1190]
            }
        }
    });

    mapa.addLayer({

        id: 'area-eco-layer',

        type: 'circle',

        source: 'area-eco',

        paint: {

            'circle-radius': 120,

            'circle-color': '#2ecc71',

            'circle-opacity': 0.15,

            'circle-stroke-width': 2,

            'circle-stroke-color': '#1b7925'
        }
    });
});