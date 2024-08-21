
// base que será usada para armazenar o conteúdo da tabela html
const dados = [];
var tamanho = 0
var indice = []
function cadastro(){
    // variaveis que armazenam o conteúdo registrado em html
    var nome = document.getElementById('nome').value
    var desc = document.getElementById('descricao').value
    var preco = document.getElementById('valor').value
    var opcao = document.getElementsByName('opcao')

    tamanho++
    console.log('tamanho: '+tamanho)
    // restrições 
    if (preco.includes(".")) {
        var valor = Number(preco).toLocaleString()
        var separa = preco.split(".")
        var tamanhoCasa = separa[1].length
        if (tamanhoCasa < 2){
            var valor = parseInt(separa[0]).toLocaleString()+","+separa[1]+"0"
        }
    }
    else{
        var valor = parseInt(preco).toLocaleString()+',00'
    }

    var Detecta_erroNome = nome.match(/[^\p{L}\p{N}\s]/gu);
    var Detecta_erroDesc = desc.match(/[^\p{L}\p{N}\s]/gu);
    if (Detecta_erroNome != null) {
        alert(`Os seguintes caracteres detectados não são válidos ${Detecta_erroNome}`)
        throw new Error('caracteres inválidos')
    }
    if(Detecta_erroDesc != null){
        alert(`Os seguintes caracteres detectados não são válidos ${Detecta_erroDesc}`)
        throw new Error('caracteres inválidos')
    }

    if(opcao[0].checked){
        console.log('sim')
    }
    else if (opcao[1].checked){
        console.log('não')
        indice.push(tamanho-1)
        console.log('vetor Indice: '+indice)
    }
    else{
        window.alert('ERRO: favor selecionar disponibilidade')
        throw new Error('favor selecionar disponibilidade')
    }

    // criação de objetos com dados
    if (nome && valor) {
        const novoProduto = { nome: nome, preco: valor};
        dados.push(novoProduto);

        // Limpar os campos de entrada após adicionar o produto
        document.getElementById("nome").value = "";
        document.getElementById("valor").value = "";
        document.getElementById('descricao').value = ''
        
    } else {
        alert("Por favor, preencha todos os campos.");
    }
    
    atualiza_tabela()

}

function atualiza_tabela(){
    // Limpa o conteúdo anterior
    const container = document.getElementById('escritaRES');
    container.innerHTML = ''; 

    // Cria elementos da tabela
    const table = document.createElement('table');
    table.id = 'tabelaProdutos';
    const thead = document.createElement('thead');
    const tbody = document.createElement('tbody');
    
    // Cria o cabeçalho da tabela
    const headerRow = document.createElement('tr');
    const headerNome = document.createElement('th');
    headerNome.textContent = 'Nome';
    const headerPreco = document.createElement('th');
    headerPreco.textContent = 'Preço';
    
    headerRow.appendChild(headerNome);
    headerRow.appendChild(headerPreco);
    thead.appendChild(headerRow);
    // Cria as linhas da tabela com os dados
    dados.forEach(item => {
        const row = document.createElement('tr')
        row.setAttribute('name', 'linha');

        var cellNome = document.createElement('td');
        cellNome.textContent = item.nome;
        var cellPreco = document.createElement('td');
        cellPreco.textContent = item.preco;

        row.appendChild(cellNome);
        row.appendChild(cellPreco);
        tbody.appendChild(row);
    });

    // Adiciona thead e tbody à tabela
    table.appendChild(thead);
    table.appendChild(tbody);

    // Adiciona a tabela ao container no HTML
    container.appendChild(table);

    //ordenarTabela()
    mudança_cor()
}

function mudança_cor() {
    // Obter todos os elementos com o nome 'linha'
    var elements = document.getElementsByName('linha')

    for (var value of indice) {
        elements[value].style.color = 'red'
    }

    ordenarTabela()

}

function ordenarTabela() {
    // ordena os valores da tabela do menor para o maior
    const tabela = document.getElementById("tabelaProdutos").getElementsByTagName('tbody')[0];
    const linhas = Array.from(tabela.rows);
    
    linhas.sort((a, b) => {
        const precoA = parseFloat(a.cells[1].innerText);
        const precoB = parseFloat(b.cells[1].innerText);
        return precoA - precoB;
    });
    
    linhas.forEach(linha => tabela.appendChild(linha));
}

// faz o foco da escrita voltar para o nome
function novo_cadastro(){
    var nome = document.getElementById('nome')
    nome.value = ''
    nome.focus()
}