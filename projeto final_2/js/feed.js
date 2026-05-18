let posts = JSON.parse(localStorage.getItem("posts")) || [];
let stories = JSON.parse(localStorage.getItem("stories")) || [];

/* =========================
   SALVAR POSTS
========================= */
function salvarPosts() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

/* =========================
   SALVAR STORIES
========================= */
function salvarStories() {
    localStorage.setItem("stories", JSON.stringify(stories));
}

/* =========================
   CARREGAR POSTS
========================= */
function carregarPosts() {

    const listaPosts = document.getElementById("listaPosts");

    if (!listaPosts) return;

    listaPosts.innerHTML = "";

    if (posts.length === 0) {

        listaPosts.innerHTML = `
            <div class="post-instagram">
                <div class="info-post">
                    Nenhuma publicação encontrada.
                </div>
            </div>
        `;

        return;
    }

    posts.forEach((post, index) => {

        listaPosts.innerHTML += `

            <article class="post-instagram">

                <div class="post-topo">

                    <div class="post-user">

                        <img 
                            src="imagens/participantes.jpeg" 
                            alt="Usuário"
                        >

                        <div>
                            <strong>${post.nomeUsuario}</strong>

                            <span>
                                ${post.localizacao} • ${post.data}
                            </span>
                        </div>

                    </div>

                    <div class="menu-post">

                        <button 
                            class="btn-menu"
                            onclick="toggleMenu(${index})"
                        >
                            <i class="fa-solid fa-ellipsis"></i>
                        </button>

                        <div 
                            class="dropdown-menu"
                            id="menu-${index}"
                        >

                            <button onclick="apagarPost(${index})">
                                <i class="fa-solid fa-trash"></i>
                                Excluir publicação
                            </button>

                        </div>

                    </div>

                </div>

                <img 
                    class="imagem-post"
                    src="${post.imagem}"
                    alt="Imagem da publicação"
                >

                <div class="acoes-post">

                    <button onclick="curtirPost(${index})">
                        ${post.curtido ? "♥" : "♡"}
                    </button>

                    <button onclick="abrirModalComentarios(${index})">
                        <i class="fa-regular fa-comment"></i>
                    </button>

                    <button class="salvar">
                        ♡
                    </button>

                </div>

                <div class="info-post">

                    <p class="curtidas">
                        ${post.curtidas || 0} curtidas
                    </p>

                    <p class="descricao-post">
                        <strong>${post.nomeUsuario}</strong>
                        ${post.descricao}
                    </p>

                </div>

            </article>

        `;
    });
}

/* =========================
   CURTIR POST
========================= */
function curtirPost(index) {

    posts[index].curtidas = posts[index].curtidas || 0;
    posts[index].curtido = !posts[index].curtido;

    if (posts[index].curtido) {
        posts[index].curtidas++;
    } else {
        posts[index].curtidas--;
    }

    salvarPosts();
    carregarPosts();
}

/* =========================
   MENU POST
========================= */
function toggleMenu(index) {

    const menu = document.getElementById(`menu-${index}`);

    document.querySelectorAll(".dropdown-menu").forEach(item => {

        if (item !== menu) {
            item.classList.remove("ativo");
        }

    });

    menu.classList.toggle("ativo");
}

/* =========================
   APAGAR POST
========================= */
function apagarPost(index) {

    const confirmar = confirm("Deseja excluir esta publicação?");

    if (!confirmar) return;

    posts.splice(index, 1);

    salvarPosts();
    carregarPosts();
}

/* =========================
   MODAL COMENTÁRIOS
========================= */
function abrirModalComentarios(index) {

    const post = posts[index];

    if (!post.comentarios) {
        post.comentarios = [];
    }

    let modal = document.getElementById("modalComentarios");

    if (!modal) {

        modal = document.createElement("div");
        modal.id = "modalComentarios";
        document.body.appendChild(modal);

    }

    modal.innerHTML = `

        <div 
            class="fundo-modal"
            onclick="fecharModalComentarios()"
        ></div>

        <div class="comentarios-modal">

            <div class="barra-modal"></div>

            <h2>Comentários</h2>

            <div class="lista-comentarios-modal">

                ${
                    post.comentarios.length > 0

                    ? post.comentarios.map((comentario, i) => `

                        <div class="comentario-item">

                            <div class="comentario-avatar"></div>

                            <div class="comentario-conteudo">

                                <span class="comentario-user">
                                    ${comentario.nome}
                                </span>

                                <p>
                                    ${comentario.texto}
                                </p>

                                <div class="comentario-acoes">

                                    <button onclick="abrirResposta(${index}, ${i})">
                                        Responder
                                    </button>

                                    <button onclick="apagarComentario(${index}, ${i})">
                                        Apagar Comentario
                                    </button>

                                    <span>
                                        ${comentario.curtidas || 0} curtidas
                                    </span>

                                </div>

                                <div class="respostas">

                                    ${(comentario.respostas || []).map(resposta => `

                                        <div class="resposta-item">
                                            <strong>${resposta.nome}</strong>
                                            <p>${resposta.texto}</p>
                                        </div>

                                    `).join("")}

                                </div>

                                <div 
                                    class="caixa-resposta"
                                    id="resposta-${index}-${i}"
                                >

                                    <input
                                        type="text"
                                        id="textoResposta-${index}-${i}"
                                        placeholder="Responder comentário..."
                                        onkeydown="enviarRespostaEnter(event, ${index}, ${i})"
                                    >

                                    <button onclick="responderComentario(${index}, ${i})">
                                        Enviar
                                    </button>

                                </div>

                            </div>

                            <button 
                                class="like-comentario"
                                onclick="curtirComentario(${index}, ${i})"
                            >
                                ${comentario.curtido ? "♥" : "♡"}
                            </button>

                        </div>

                    `).join("")

                    : `
                        <p class="sem-comentarios">
                            Ainda não há comentários.
                        </p>
                    `
                }

            </div>

            <div class="area-comentar-modal">

                <div class="comentario-avatar pequeno"></div>

                <input
                    type="text"
                    id="textoComentarioModal"
                    placeholder="O que você acha disso?"
                    onkeydown="enviarComentarioEnter(event, ${index})"
                >

                <button onclick="comentarPostModal(${index})">
                    Enviar
                </button>

            </div>

        </div>
    `;

    modal.style.display = "block";
}

/* =========================
   APAGAR COMENTÁRIO (INSTAGRAM STYLE)
========================= */
function apagarComentario(indexPost, indexComentario) {
    let modalConfirmacao = document.getElementById("modalConfirmacaoInsta");

    if (!modalConfirmacao) {
        modalConfirmacao = document.createElement("div");
        modalConfirmacao.id = "modalConfirmacaoInsta";
        modalConfirmacao.className = "modal-insta-container";
        document.body.appendChild(modalConfirmacao);
    }

    // Montando o HTML com as classes estruturadas exatamente vinculadas ao container
    modalConfirmacao.innerHTML = `
        <div class="modal-insta-conteudo">
            <div class="modal-insta-texto">
                <h3>Deseja apagar este comentário?</h3>
            </div>
            <button id="btnConfirmarExcluir" class="btn-insta-opcao perigo">Excluir</button>
            <button id="btnCancelarExcluir" class="btn-insta-opcao">Cancelar</button>
        </div>
    `;

    // Força a exibição como FLEX na frente de tudo usando a folha de estilo em linha
    modalConfirmacao.style.setProperty("display", "flex", "important");

    const btnExcluir = document.getElementById("btnConfirmarExcluir");
    const btnCancelar = document.getElementById("btnCancelarExcluir");

    if (btnExcluir) {
        btnExcluir.onclick = function () {
            posts[indexPost].comentarios.splice(indexComentario, 1);
            salvarPosts();
            abrirModalComentarios(indexPost);
            carregarPosts();
            fecharModalConfirmacaoInsta();
        };
    }

    if (btnCancelar) {
        btnCancelar.onclick = fecharModalConfirmacaoInsta;
    }
}

function fecharModalConfirmacaoInsta() {
    const modalConfirmacao = document.getElementById("modalConfirmacaoInsta");
    if (modalConfirmacao) {
        modalConfirmacao.style.setProperty("display", "none", "important");
    }
}

/* =========================
   FECHAR MODAL
========================= */
function fecharModalComentarios() {

    const modal = document.getElementById("modalComentarios");

    if (modal) {
        modal.style.display = "none";
    }
}

/* =========================
   COMENTAR
========================= */
function comentarPostModal(index) {

    const input = document.getElementById("textoComentarioModal");
    const texto = input.value.trim();

    if (!texto) {
        alert("Digite um comentário.");
        return;
    }

    if (!posts[index].comentarios) {
        posts[index].comentarios = [];
    }

    posts[index].comentarios.push({
        nome: posts[index].nomeUsuario,
        texto,
        curtidas: 0,
        curtido: false,
        respostas: []
    });

    salvarPosts();
    abrirModalComentarios(index);
    carregarPosts();
}

/* =========================
   CURTIR COMENTÁRIO
========================= */
function curtirComentario(indexPost, indexComentario) {

    const comentario = posts[indexPost].comentarios[indexComentario];

    comentario.curtidas = comentario.curtidas || 0;
    comentario.curtido = !comentario.curtido;

    if (comentario.curtido) {
        comentario.curtidas++;
    } else {
        comentario.curtidas--;
    }

    salvarPosts();
    abrirModalComentarios(indexPost);
    carregarPosts();
}

/* =========================
   ABRIR RESPOSTA
========================= */
function abrirResposta(indexPost, indexComentario) {

    const caixa = document.getElementById(`resposta-${indexPost}-${indexComentario}`);

    if (caixa) {
        caixa.classList.toggle("ativo");
    }
}

/* =========================
   RESPONDER
========================= */
function responderComentario(indexPost, indexComentario) {

    const input = document.getElementById(`textoResposta-${indexPost}-${indexComentario}`);
    const texto = input.value.trim();

    if (!texto) {
        alert("Digite uma resposta.");
        return;
    }

    const comentario = posts[indexPost].comentarios[indexComentario];

    if (!comentario.respostas) {
        comentario.respostas = [];
    }

    comentario.respostas.push({
        nome: posts[indexPost].nomeUsuario,
        texto
    });

    salvarPosts();
    abrirModalComentarios(indexPost);
    carregarPosts();
}

/* =========================
   ENTER COMENTÁRIO
========================= */
function enviarComentarioEnter(event, index) {

    if (event.key === "Enter") {
        comentarPostModal(index);
    }
}

/* =========================
   ENTER RESPOSTA
========================= */
function enviarRespostaEnter(event, indexPost, indexComentario) {

    if (event.key === "Enter") {
        responderComentario(indexPost, indexComentario);
    }
}

/* =========================
   PUBLICAÇÕES CURTIDAS
========================= */
function abrirCurtidos() {

    const modal = document.getElementById("modalCurtidos");
    const lista = document.getElementById("listaCurtidos");

    if (!modal || !lista) return;

    lista.innerHTML = "";

    const curtidos = posts.filter(post => post.curtido);

    if (curtidos.length === 0) {

        lista.innerHTML = `
            <p class="sem-curtidos">
                Nenhuma publicação curtida.
            </p>
        `;

    } else {

        curtidos.forEach(post => {

            lista.innerHTML += `
                <article class="post-curtido">
                    <img src="${post.imagem}" alt="Post curtido">

                    <div class="info-curtido">
                        <strong>${post.nomeUsuario}</strong>
                        <p>${post.descricao}</p>
                    </div>
                </article>
            `;

        });

    }

    modal.classList.add("ativo");
}

function fecharCurtidos() {

    const modal = document.getElementById("modalCurtidos");

    if (modal) {
        modal.classList.remove("ativo");
    }
}

/* =========================
   TEMA
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
   CÂMERA POST
========================= */
let streamCamera = null;
let fotoCapturada = null;

async function abrirCamera() {

    const modal = document.getElementById("modalCamera");
    const video = document.getElementById("videoCamera");
    const preview = document.getElementById("previewFoto");
    const acoesCamera = document.getElementById("acoesCamera");
    const acoesPreview = document.getElementById("acoesPreview");

    fotoCapturada = null;

    preview.style.display = "none";
    video.style.display = "block";
    acoesCamera.style.display = "flex";
    acoesPreview.style.display = "none";

    try {

        streamCamera = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
            audio: false
        });

        video.srcObject = streamCamera;
        modal.classList.add("ativo");

    } catch (erro) {

        alert("Não foi possível acessar a câmera.");
        console.error(erro);

    }
}

function tirarFoto() {

    const video = document.getElementById("videoCamera");
    const canvas = document.getElementById("canvasCamera");
    const preview = document.getElementById("previewFoto");
    const acoesCamera = document.getElementById("acoesCamera");
    const acoesPreview = document.getElementById("acoesPreview");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const contexto = canvas.getContext("2d");

    contexto.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    fotoCapturada = canvas.toDataURL("image/jpeg");

    preview.src = fotoCapturada;

    video.style.display = "none";
    preview.style.display = "block";

    acoesCamera.style.display = "none";
    acoesPreview.style.display = "flex";
}

function publicarFotoCamera() {

    if (!fotoCapturada) {
        alert("Tire uma foto antes de publicar.");
        return;
    }

    const novoPost = {
        nomeUsuario: "Miliane",
        localizacao: "Manaus",
        tipoAcao: "Plantação",
        descricao: "Nova publicação feita pela câmera",
        quantidade: 1,
        imagem: fotoCapturada,
        curtidas: 0,
        curtido: false,
        comentarios: [],
        data: new Date().toLocaleDateString("pt-BR")
    };

    posts.unshift(novoPost);

    salvarPosts();
    carregarPosts();
    fecharCamera();
}

function refazerFoto() {

    const video = document.getElementById("videoCamera");
    const preview = document.getElementById("previewFoto");
    const acoesCamera = document.getElementById("acoesCamera");
    const acoesPreview = document.getElementById("acoesPreview");

    fotoCapturada = null;

    preview.style.display = "none";
    video.style.display = "block";

    acoesPreview.style.display = "none";
    acoesCamera.style.display = "flex";
}

function fecharCamera() {

    const modal = document.getElementById("modalCamera");
    const video = document.getElementById("videoCamera");

    modal.classList.remove("ativo");

    if (streamCamera) {

        streamCamera
            .getTracks()
            .forEach(track => track.stop());

        streamCamera = null;
    }

    video.srcObject = null;
    fotoCapturada = null;
}

/* =========================
   STORIES
========================= */
let streamStory = null;
let storyCapturado = null;

async function abrirCameraStory() {

    if (stories.length > 0) {
        verStory(stories[0].imagem, true);
        return;
    }

    const modal = document.getElementById("modalStory");
    const video = document.getElementById("videoStory");
    const preview = document.getElementById("previewStory");
    const acoesCamera = document.getElementById("acoesStoryCamera");
    const acoesPreview = document.getElementById("acoesStoryPreview");

    storyCapturado = null;

    preview.style.display = "none";
    video.style.display = "block";
    acoesCamera.style.display = "flex";
    acoesPreview.style.display = "none";

    try {

        streamStory = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: "environment"
            },
            audio: false
        });

        video.srcObject = streamStory;

        modal.style.display = "flex";
        modal.classList.add("ativo");

    } catch (erro) {

        alert("Não foi possível acessar a câmera.");
        console.error(erro);

    }
}

function tirarFotoStory() {

    const video = document.getElementById("videoStory");
    const canvas = document.getElementById("canvasStory");
    const preview = document.getElementById("previewStory");
    const acoesCamera = document.getElementById("acoesStoryCamera");
    const acoesPreview = document.getElementById("acoesStoryPreview");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const contexto = canvas.getContext("2d");

    contexto.drawImage(
        video,
        0,
        0,
        canvas.width,
        canvas.height
    );

    storyCapturado = canvas.toDataURL("image/jpeg");

    preview.src = storyCapturado;

    video.style.display = "none";
    preview.style.display = "block";

    acoesCamera.style.display = "none";
    acoesPreview.style.display = "flex";
}

function publicarStory() {

    if (!storyCapturado) {
        alert("Tire uma foto antes.");
        return;
    }

    stories = [
        {
            nome: "Seu story",
            imagem: storyCapturado,
            data: new Date().toLocaleDateString("pt-BR")
        }
    ];

    salvarStories();
    carregarStories();
    fecharCameraStory();
}

function refazerStory() {

    const video = document.getElementById("videoStory");
    const preview = document.getElementById("previewStory");
    const acoesCamera = document.getElementById("acoesStoryCamera");
    const acoesPreview = document.getElementById("acoesStoryPreview");

    storyCapturado = null;

    preview.style.display = "none";
    video.style.display = "block";

    acoesPreview.style.display = "none";
    acoesCamera.style.display = "flex";
}

function fecharCameraStory() {

    const modal = document.getElementById("modalStory");
    const video = document.getElementById("videoStory");

    modal.classList.remove("ativo");
    modal.style.display = "none";

    if (streamStory) {

        streamStory
            .getTracks()
            .forEach(track => track.stop());

        streamStory = null;
    }

    video.srcObject = null;
    storyCapturado = null;
}

function carregarStories() {

    const meuStoryImg = document.getElementById("imagemMeuStory");

    if (!meuStoryImg) return;

    document
        .querySelectorAll(".story-dinamico")
        .forEach(story => story.remove());

    if (stories.length > 0) {

        meuStoryImg.src = stories[0].imagem;

    } else {

        meuStoryImg.src = "imagens/participantes.jpeg";

    }
}

function verStory(imagem, meuStory = false) {

    const modal = document.getElementById("modalVerStory");
    const img = document.getElementById("imagemStoryAberto");
    const btnApagar = document.getElementById("btnApagarStory");

    if (!modal || !img) return;

    img.src = imagem;

    if (btnApagar) {
        btnApagar.style.display = meuStory ? "block" : "none";
    }

    modal.style.display = "flex";
    modal.classList.add("ativo");
}

function verStoryFixo(imagem) {
    verStory(imagem, false);
}

function fecharVerStory() {

    const modal = document.getElementById("modalVerStory");

    if (modal) {
        modal.classList.remove("ativo");
        modal.style.display = "none";
    }
}

function apagarStory(event) {

    event.stopPropagation();

    const confirmar = confirm("Deseja apagar seu story?");

    if (!confirmar) return;

    stories = [];

    localStorage.removeItem("stories");

    carregarStories();
    fecharVerStory();
}

/* =========================
   INICIAR
========================= */
carregarTema();
carregarPosts();
carregarStories();