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

salvarPosts();

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
      salvarPost(event.target.result);
    };

    leitor.readAsDataURL(arquivoImagem);
  } else {
    salvarPost("imagens/reflorestamento.jpeg");
  }

  function salvarPost(imagem) {
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

function carregarPerfil() {
  const nomeSalvo = localStorage.getItem("nomeUsuarioPerfil");
  const userSalvo = localStorage.getItem("userPerfil");

  const nomePerfil = document.getElementById("nomePerfil");
  const userPerfil = document.getElementById("userPerfil");

  if (nomePerfil && nomeSalvo) {
    nomePerfil.textContent = nomeSalvo;
  }

  if (userPerfil && userSalvo) {
    userPerfil.textContent = userSalvo;
  }
}

function carregarPosts() {
  const listaPosts = document.getElementById("listaPosts");

  if (!listaPosts) return;

  listaPosts.innerHTML = "";

  if (posts.length === 0) {
    listaPosts.innerHTML = `
      <div class="post-instagram vazio">
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
            <button class="btn-menu" onclick="toggleMenu(${index})">
              <i class="fa-solid fa-ellipsis"></i>
            </button>

            <div class="dropdown-menu" id="menu-${index}">
              <button onclick="apagarPost(${index})">
                <i class="fa-solid fa-trash"></i>
                Excluir publicação
              </button>
            </div>
          </div>
        </div>

        <img 
          src="${post.imagem}" 
          alt="Post"
          class="imagem-post-perfil"
        >

        <div class="overlay-post">
          <span>❤️ ${post.curtidas}</span>
          <span>💬 ${(post.comentarios || []).length}</span>
        </div>

      </article>
    `;
  });
}

function toggleMenu(index) {
  const menu = document.getElementById(`menu-${index}`);

  document.querySelectorAll(".dropdown-menu").forEach(item => {
    if (item !== menu) {
      item.classList.remove("ativo");
    }
  });

  menu.classList.toggle("ativo");
}

function apagarPost(index) {
  const confirmar = confirm("Deseja excluir esta publicação?");

  if (!confirmar) return;

  posts.splice(index, 1);
  salvarPosts();
  carregarPosts();
}

function limparCampos() {
  document.getElementById("nomeUsuario").value = "";
  document.getElementById("localizacao").value = "";
  document.getElementById("descricao").value = "";
  document.getElementById("quantidade").value = "";
  document.getElementById("imagemPost").value = "";
}

function salvarPosts() {
  localStorage.setItem("posts", JSON.stringify(posts));
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

carregarTema();
carregarPerfil();
carregarPosts();