// Novo JS com reescritas variáveis por estilo

const sinonimos = {
  feliz: ["radiante", "contente", "alegre", "eufórico"],
  triste: ["melancólico", "abatido", "infeliz", "angustiado"],
  amor: ["paixão", "sentimento profundo", "desejo sincero", "afeição eterna"],
  mundo: ["universo", "realidade", "esfera existencial", "terra vasta"],
  noite: ["escuridão serena", "véu noturno", "abismo estrelado"],
  alma: ["essência", "espírito", "interior", "voz interna"]
};

function escolherSinonimo(palavra) {
  const lista = sinonimos[palavra.toLowerCase()];
  if (!lista) return palavra;
  const alternativa = lista[Math.floor(Math.random() * lista.length)];
  return manterCapitalizacao(palavra, alternativa);
}

function manterCapitalizacao(original, novo) {
  return original[0] === original[0].toUpperCase()
    ? novo.charAt(0).toUpperCase() + novo.slice(1)
    : novo;
}

function aplicarSinonimos(texto) {
  return texto.split(/(\W+)/).map(p => escolherSinonimo(p)).join("");
}

function estiloClassico(texto) {
  return aplicarSinonimos(texto).replace(/([.!?])\s*/g, "$1\n");
}

function estiloContemporaneo(texto) {
  return aplicarSinonimos(texto).replace(/\b(triste|feliz)\b/gi, m => {
    return m.toLowerCase() === "triste" ? "na bad" : "de boas";
  });
}

function estiloAcademia1930(texto) {
  return aplicarSinonimos(texto).replace(/\b(mundo|alma)\b/gi, m => {
    return m.toLowerCase() === "mundo"
      ? "a esfera das ideias concretas"
      : "a entidade metafísica do ser";
  });
}

function estiloBarroco(texto) {
  return aplicarSinonimos(texto)
    .replace(/([.!?])\s*/g, "$1\n")
    .replace(/\b(e)\b/gi, ", e destarte,");
}

function estiloSurreal(texto) {
  return aplicarSinonimos(texto).replace(/\b(mundo|noite|alma)\b/gi, m => {
    const visoes = {
      mundo: "um jardim de espelhos flutuantes",
      noite: "o ventre cósmico do tempo",
      alma: "um animal feito de brumas"
    };
    return visoes[m.toLowerCase()] || m;
  });
}

function reescreverTexto() {
  const texto = document.getElementById("textoEntrada").value;
  document.getElementById("saidaClassico").innerText = estiloClassico(texto);
  document.getElementById("saidaContemporaneo").innerText = estiloContemporaneo(texto);
  document.getElementById("saidaVintage").innerText = estiloAcademia1930(texto);
  document.getElementById("saidaBarroco").innerText = estiloBarroco(texto);
  document.getElementById("saidaSurreal").innerText = estiloSurreal(texto);
}

function limparTexto() {
  document.getElementById("textoEntrada").value = "";
  ["saidaClassico", "saidaContemporaneo", "saidaVintage", "saidaBarroco", "saidaSurreal"].forEach(id => document.getElementById(id).innerText = "");
}

function mostrarSinonimos() {
  const texto = document.getElementById("textoEntrada").value.toLowerCase();
  const palavras = texto.split(/\W+/);
  const encontrados = palavras.filter(p => sinonimos[p]);
  if (!encontrados.length) return alert("Nenhuma palavra com sinônimo encontrado.");
  const lista = encontrados.map(p => `\n- ${p}: ${sinonimos[p].join(", ")}`).join("");
  alert("🔍 Palavras com sinônimos disponíveis:" + lista);
}

window.onload = () => {
  document.getElementById("botaoReescrever").onclick = reescreverTexto;

  const container = document.querySelector(".container");

  const botaoLimpar = document.createElement("button");
  botaoLimpar.textContent = "🧹 Limpar Tudo";
  botaoLimpar.onclick = limparTexto;

  const botaoSinonimos = document.createElement("button");
  botaoSinonimos.textContent = "📖 Ver Sinônimos";
  botaoSinonimos.onclick = mostrarSinonimos;

  container.insertBefore(botaoLimpar, container.children[2]);
  container.insertBefore(botaoSinonimos, container.children[3]);

  const saidas = [
    { id: "saidaClassico", estilo: estiloClassico },
    { id: "saidaContemporaneo", estilo: estiloContemporaneo },
    { id: "saidaVintage", estilo: estiloAcademia1930 },
    { id: "saidaBarroco", estilo: estiloBarroco },
    { id: "saidaSurreal", estilo: estiloSurreal }
  ];

  saidas.forEach(obj => {
    const botao = document.createElement("button");
    botao.textContent = "🔁 Tentar novamente";
    botao.className = "icon-btn";
    botao.onclick = () => {
      const texto = document.getElementById("textoEntrada").value;
      document.getElementById(obj.id).innerText = obj.estilo(texto);
    };
    const parent = document.getElementById(obj.id).parentElement;
    parent.appendChild(botao);
  });
};