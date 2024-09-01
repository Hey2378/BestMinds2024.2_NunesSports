// pega elementos do html
const frm = document.querySelector("form");
const table = document.querySelector("table");


// cria um vetor de objetos de produtos
// cada produto(elemento) contém um codigo, um nome, uma descricao e um valor
const produtos = [{
    codigo: "",
    nome: "",
    descricao: "",
    valor: ""
}];


// função para adicionar linhas na tabela a cada clique no botão adicionar
function adicionarLinha(codigo, nome, descricao, preco) {
    produtos.push({codigo, nome, descricao, preco});
    let linha = table.insertRow(-1);
    let col1 = linha.insertCell(0);
    let col2 = linha.insertCell(1);
    let col3 = linha.insertCell(2);
    let col4 = linha.insertCell(3);
    let col5 = linha.insertCell(4);
    let col6 = linha.insertCell(5);
    for (const produto of produtos) {
        col1.textContent = produto.codigo;
        col2.textContent = produto.nome
        col3.textContent = produto.descricao;
        col4.textContent = produto.preco;
        col5.innerHTML = "<i class='excluir'>&#x274C</i>";
        col6.innerHTML = "<i class='editar'>&#x270F</i>";
    }
}



frm.addEventListener("submit", (e)=> {
    e.preventDefault();
    const codigo = Number(frm.inCodigo.value);
    const nome = frm.inNome.value;
    const descricao = frm.inDescricao.value;
    const preco = Number(frm.inPreco.value);

    adicionarLinha(codigo, nome, descricao, preco);
    frm.reset();
});

table.addEventListener("click", (elemento)=> {
    if (elemento.target.classList.contains("excluir")) {
        if (confirm("Excluir linha selecionada?")) {
            elemento.target.parentElement.parentElement.remove();
        }
    }

    if (elemento.target.classList.contains("editar")) {
        if (confirm("Editar linha selecionada?")) {
            const codigo = elemento.target.parentElement.parentElement.children[0].textContent;
            for (const produto of produtos) {
                if (produto.codigo == codigo) {
                    const nome = prompt("Nome: ");
                    const descricao = prompt("Descrição: ");
                    const preco = Number(prompt("Preço R$: "));
                    
                    produto.nome = nome;
                    produto.descricao = descricao;
                    produto.preco = preco;
                    
                    elemento.target.parentElement.parentElement.children[1].textContent = produto.nome;
                    elemento.target.parentElement.parentElement.children[2].textContent = produto.descricao;
                    elemento.target.parentElement.parentElement.children[3].textContent = produto.preco;
                }
            }
        }
    }
});
