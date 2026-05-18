// 1. INICIALIZAÇÃO E REGRAS DE NEGÓCIO (ESCOPO GLOBAL)
let posts = JSON.parse(localStorage.getItem("posts")) || [];

posts = posts.map(post => ({
  ...post,
  curtidas: post.curtidas || 0,
  comentarios: (post.comentarios || []).map(comentario => ({
    ...comentario,
    curtidas: comentario.curtidas || 0,
    curtido: comentario.curtido || false,
    respostas: comentario.respostas || []
  }))
}));

// Variável global para rastrear qual post foi selecionado para exclusão
let postParaApagar = null;

function salvarPosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
}

// 2. FUNÇÃO DE PUBLICAR POST
function publicarPost() {
  const nomeUsuario = document.getElementById("nomeUsuario").value.trim();
  const localizacao = document.getElementById("localizacao").value.trim();
  const tipoAcao = document.getElementById("tipoAcao").value;
  const descricao = document.getElementById("descricao").value.trim();
  const quantidade = document.getElementById("quantidade").value;
  const imagemInput = document.getElementById("imagemPost");

  if (!nomeUsuario || !localizacao || !descricao || !quantidade) {
    alert("Preencha todos os campos antes de publicar.");
    return;
  }

  const arquivoImagem = imagemInput.files[0];

  if (arquivoImagem) {
    const leitor = new FileReader();
    leitor.onload = function(event) {
      executarSalvamento(event.target.result);
    };
    leitor.readAsDataURL(arquivoImagem);
  } else {
    executarSalvamento("imagens/reflorestamento.jpeg");
  }

  function executarSalvamento(imagem) {
    localStorage.setItem("nomeUsuarioPerfil", nomeUsuario);
    localStorage.setItem(
      "userPerfil",
      "@" + nomeUsuario.toLowerCase().replace(/\s/g, "_")
    );

    const novoPost = {
      nomeUsuario,
      localizacao,
      tipoAcao,
      descricao,
      quantidade,
      imagem,
      curtidas: 0,
      comentarios: [],
      data: new Date().toLocaleDateString("pt-BR")
    };

    posts.unshift(novoPost);
    salvarPosts();
    limparCampos();
    carregarPerfil();
    carregarPosts();
    fecharCriarPost();
  }
}

// 3. CARREGAR PERFIL E RENDERIZAR POSTS
function carregarPerfil() {
  const nomeSalvo = localStorage.getItem("nomeUsuarioPerfil");
  const userSalvo = localStorage.getItem("userPerfil");

  const nomePerfil = document.getElementById("nomePerfil");
  const userPerfil = document.getElementById("userPerfil");

  if (nomePerfil && nomeSalvo) nomePerfil.textContent = nomeSalvo;
  if (userPerfil && userSalvo) userPerfil.textContent = userSalvo;
}

function carregarPosts() {
  const listaPosts = document.getElementById("listaPosts");
  if (!listaPosts) return;

  listaPosts.innerHTML = "";

  if (posts.length === 0) {
    listaPosts.innerHTML = `
      <div class="post-instagram vazio" style="grid-column: 1/-1; text-align: center; padding: 40px; color: #42634c;">
        <p>Nenhuma publicação encontrada.</p>
      </div>
    `;
    return;
  }

  posts.forEach((post, index) => {
    listaPosts.innerHTML += `
      <article class="post-perfil">
        <div class="topo-post-perfil">
          <h3>${post.nomeUsuario}</h3>
          <div class="menu-post">
            <button class="btn-menu" onclick="toggleMenu(event, ${index})">
              <i class="fa-solid fa-ellipsis"></i>
            </button>
            <div class="dropdown-menu" id="menu-${index}">
              <button onclick="confirmarApagarPost(${index})">
                <i class="fa-solid fa-trash"></i>
                Excluir publicação
              </button>
            </div>
          </div>
        </div>
        <img src="${post.imagem}" alt="Post" class="imagem-post-perfil">
        <div class="overlay-post">
          <span>❤️ ${post.curtidas}</span>
          <span>💬 ${(post.comentarios || []).length}</span>
        </div>
      </article>
    `;
  });
}

// 4. CONTROLE DOS DROPDOWNS (3 PONTINHOS)
function toggleMenu(event, index) {
  event.stopPropagation(); 
  const menu = document.getElementById(`menu-${index}`);

  document.querySelectorAll(".dropdown-menu").forEach(item => {
    if (item !== menu) {
      item.classList.remove("ativo");
    }
  });

  if (menu) {
    menu.classList.toggle("ativo");
  }
}

// Fecha menus ao clicar fora
document.addEventListener("click", () => {
  document.querySelectorAll(".dropdown-menu").forEach(item => {
    item.classList.remove("ativo");
  });
});

// 5. JANELA DE EXCLUSÃO (MODAL CUSTOMIZADO)
function confirmarApagarPost(index) {
  postParaApagar = index;
  const modalExcluir = document.getElementById("modalExcluirPost");
  if (modalExcluir) {
    modalExcluir.classList.add("ativo");
  }
}

function fecharModalExcluir() {
  postParaApagar = null;
  const modalExcluir = document.getElementById("modalExcluirPost");
  if (modalExcluir) {
    modalExcluir.classList.remove("dark"); // Prevenção se injetou classe errada
    modalExcluir.classList.remove("ativo");
  }
}

function executarApagarPost() {
  if (postParaApagar !== null) {
    posts.splice(postParaApagar, 1);
    salvarPosts();
    carregarPosts();
    fecharModalExcluir();
  }
}

// 6. UTILITÁRIOS E ALTERNADOR DE TEMA
function limparCampos() {
  document.getElementById("nomeUsuario").value = "";
  document.getElementById("localizacao").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("imagemPost").value = "";
}

function abrirCriarPost(event) {
  event.preventDefault();
  document.getElementById("modalPost").classList.add("ativo");
}

function fecharCriarPost() {
  document.getElementById("modalPost").classList.remove("ativo");
}

const btnTema = document.getElementById("btnTema");

function carregarTema() {
  const temaSalvo = localStorage.getItem("tema");
  if (temaSalvo === "dark") {
    document.body.classList.add("dark");
    if (btnTema) btnTema.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    if (btnTema) btnTema.textContent = "🌙";
  }
}

function alternarTema() {
  document.body.classList.toggle("dark");
  const modoDark = document.body.classList.contains("dark");
  localStorage.setItem("tema", modoDark ? "dark" : "light");
  if (btnTema) btnTema.textContent = modoDark ? "☀️" : "🌙";
}

if (btnTema) {
  btnTema.addEventListener("click", alternarTema);
}

// 7. EXECUÇÃO INICIAL
salvarPosts();
carregarTema();
carregarPerfil();
carregarPosts();