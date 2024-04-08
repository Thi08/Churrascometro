const formUsuario = document.getElementById("form-usuario");
const inputNome = document.getElementById("nome");
const inputEmail = document.getElementById("email");

formUsuario.addEventListener("submit", function (e) {
  e.preventDefault();
  localStorage.setItem("valorNome", inputNome.value);
  localStorage.setItem("valorEmail", inputEmail.value);
  localStorage.setItem("valorCEP", inputCEP.value);
  document.getElementById("cadastro").style.display = "none";
  document.getElementById("quantidade").style.display = "block";
});

if (localStorage.getItem("valorNome")) {
  inputNome.value = localStorage.getItem("valorNome");
}
if (localStorage.getItem("valorEmail")) {
  inputEmail.value = localStorage.getItem("valorEmail");
}
if (localStorage.getItem("valorCEP")) {
  inputCEP.value = localStorage.getItem("valorCEP");
}

const inputCEP = document.getElementById("CEP");
const inputLogradouro = document.createElement("input");
inputLogradouro.setAttribute("type", "text");
inputLogradouro.setAttribute("name", "logradouro");
inputLogradouro.setAttribute("id", "logradouro");
inputLogradouro.setAttribute("placeholder", "Logradouro");
const inputCidade = document.createElement("input");
inputCidade.setAttribute("type", "text");
inputCidade.setAttribute("name", "cidade");
inputCidade.setAttribute("id", "cidade");
inputCidade.setAttribute("placeholder", "Cidade");
const inputEstado = document.createElement("input");
inputEstado.setAttribute("type", "text");
inputEstado.setAttribute("name", "estado");
inputEstado.setAttribute("id", "estado");
inputEstado.setAttribute("placeholder", "Estado");

inputCEP.addEventListener("input", function () {
  const cep = inputCEP.value.replace(/\D/g, "");

  if (cep.length === 8) {
    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then((response) => response.json())
      .then((data) => {
        if (!data.erro) {
          inputLogradouro.value = data.logradouro;
          inputCidade.value = data.localidade;
          inputEstado.value = data.uf;
          document.getElementById("form-cep").appendChild(inputLogradouro);
          document.getElementById("form-cep").appendChild(inputCidade);
          document.getElementById("form-cep").appendChild(inputEstado);
        } else {
          alert("CEP inválido ou não encontrado");
          inputLogradouro.value = "";
          inputCidade.value = "";
          inputEstado.value = "";
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar endereço:", error);
      });
  } else {
    inputLogradouro.value = "";
    inputCidade.value = "";
    inputEstado.value = "";
  }
});

const formQuantidade = document.getElementById("form-quantidade");
const QuantidadeHomens = document.getElementById("quantidade_homens");
const QuantidadeMulheres = document.getElementById("quantidade_mulheres");
const QuantidadeCriancas = document.getElementById("quantidade_criancas");
const QuantidadeBebem = document.getElementById("quantidade_bebem");

formQuantidade.addEventListener("submit", function (e) {
  e.preventDefault();
  const homens = parseInt(QuantidadeHomens.value);
  const mulheres = parseInt(QuantidadeMulheres.value);
  const criancas = parseInt(QuantidadeCriancas.value);
  const bebem = parseInt(QuantidadeBebem.value);
  const adultos = homens + mulheres;
  const pessoas = adultos + criancas;

  const carne = parseInt(
    Math.ceil(homens * 0.4 + mulheres * 0.32 + criancas * 0.2)
  );
  const paoDeAlho = parseInt(Math.ceil(adultos * 2 + criancas));
  const carvao = pessoas;
  const sal = parseFloat(pessoas * 0.04 * 100);
  const gelo = parseInt(pessoas / 2);
  const refrigerante = parseInt(Math.ceil(pessoas / 5));
  const agua = parseInt(Math.ceil(pessoas / 5));
  const cerveja = parseInt(Math.ceil(bebem * 3));

  const resultado = `
    <tr><td>Carne</td><td>${carne} Kg</td></tr>
    <tr><td>Pão de Alho</td><td>${paoDeAlho} unidades</td></tr>
    <tr><td>Carvão</td><td>${carvao} Kg</td></tr>
    <tr><td>Sal</td><td>${sal} g</td></tr>
    <tr><td>Gelo</td><td>${gelo} Kg</td></tr>
    <tr><td>Refrigerante</td><td>${refrigerante} Garrafas de 2L</td></tr>
    <tr><td>Água</td><td>${agua} Garrafas de 1L</td></tr>
    <tr><td>Cerveja</td><td>${cerveja} Garrafas de 600ml</td></tr>
    `;

  document.getElementById("tabela-corpo-resultados").innerHTML = resultado;
  document.getElementById("quantidade").style.display = "none";
  document.getElementById("resultado").style.display = "block";
});

document.getElementById("btn-voltar").addEventListener("click", function () {
  document.getElementById("resultado").style.display = "none";
  document.getElementById("quantidade").style.display = "block";
});

document.getElementById("btn-salvar").addEventListener("click", function () {
  const resultadoText = document.getElementById("resultado").innerText;

  const blob = new Blob([resultadoText], { type: "text/plain" });

  const salvar = document.createElement("a");
  salvar.download = "lista_churras.txt";
  salvar.href = window.URL.createObjectURL(blob);

  document.body.appendChild(salvar);
  salvar.click();

  setTimeout(function () {
    window.URL.revokeObjectURL(salvar.href);
    document.body.removeChild(salvar);
  }, 0);
});
