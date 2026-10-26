// Ano do rodapé
document.getElementById("ano").textContent = new Date().getFullYear();

// Filtros: gerados a partir das tecnologias (data-tags) de cada projeto
const projetos = Array.from(document.querySelectorAll(".project"));
const filtros = document.getElementById("filtros");

const tecnologias = [...new Set(projetos.flatMap((p) => p.dataset.tags.split(" ")))].sort();

function criarFiltro(rotulo, valor) {
  const botao = document.createElement("button");
  botao.type = "button";
  botao.className = "chip";
  botao.textContent = rotulo;
  botao.dataset.valor = valor;
  botao.setAttribute("aria-pressed", valor === "todos" ? "true" : "false");
  filtros.appendChild(botao);
}

criarFiltro("Todos", "todos");
tecnologias.forEach((t) => criarFiltro(t, t));

filtros.addEventListener("click", (evento) => {
  const botao = evento.target.closest(".chip");
  if (!botao) return;

  filtros.querySelectorAll(".chip").forEach((b) => b.setAttribute("aria-pressed", "false"));
  botao.setAttribute("aria-pressed", "true");

  const valor = botao.dataset.valor;
  projetos.forEach((p) => {
    const mostrar = valor === "todos" || p.dataset.tags.split(" ").includes(valor);
    p.hidden = !mostrar;
  });
});

// Copiar e-mail
const botaoEmail = document.getElementById("copiar-email");
const status = document.getElementById("status");

botaoEmail.addEventListener("click", async () => {
  const email = botaoEmail.dataset.email;
  try {
    await navigator.clipboard.writeText(email);
    status.textContent = "E-mail copiado: " + email;
  } catch (erro) {
    status.textContent = "Não foi possível copiar. Meu e-mail é " + email;
  }
});
