const Header = [
    "home",
    "filmes", 
    "Sessoes",
    "salas", 
    "ingersso", 
    "cliente", 
    "contato"
]
const classificacoes = [
    { value: "livre", label: "Livre" },
    { value: "10", label: "10" },
    { value: "12", label: "12" },
    { value: "14", label: "14" },
    { value: "16", label: "16" },
    { value: "18", label: "18" }
];

const generos = [
    { value: "acao", label: "Ação" },
    { value: "comedia", label: "Comédia" },
    { value: "drama", label: "Drama" },
    { value: "terror", label: "Terror" },
    { value: "ficcao", label: "Ficção Científica" }
];
// componentes para renderizar o header
const UlElements = document.getElementById("header-list")
Object.keys(Header).map(key=>{
    const li = document.createElement("li")
    li.textContent = Header[key]
    UlElements.appendChild(li)
})


// Função para preencher selects dinamicamente
function populateSelect(selectId, options) {
    const selectElement = document.getElementById(selectId);
    options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.value = option.value;
        optionElement.textContent = option.label;
        selectElement.appendChild(optionElement);
    });
}

// Preenchendo selects
populateSelect("classificacao", classificacoes);
populateSelect("genero", generos);