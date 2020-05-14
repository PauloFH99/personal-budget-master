class Despesa{
    constructor(ano,mes,dia,tipo,descricao,valor){
        this.ano = ano;
        this.mes = mes;
        this.dia = dia;
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null)
                return false
        }
        return true;
    }
}

class Produto{
    constructor(tipo,descricao,valor,quantidade){
        this.tipo = tipo;
        this.descricao = descricao;
        this.valor = valor;
        this.quantidade = quantidade;
    }

    validarDados(){
        for(let i in this){
            if(this[i] == undefined || this[i] == '' || this[i] == null)
                return false
        }
        return true;
    }
}
class BdProduto{
    constructor(){
        let id = localStorage.getItem('id');
        if(id == null){
            localStorage.setItem(id);
        }
    }
    getProximoId(){
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId)+1;
    }
    gravar(produto){
        let id = this.getProximoId();
        localStorage.setItem(id,JSON.stringify(produto));
        localStorage.setItem('id',id);
    }
    recuperarTodosRegistros(){
        let produtos = Array();
        let id = localStorage.getItem('id');

       
        for(let i = 1; i <= id; i++){
            let produto = JSON.parse(localStorage.getItem(i));
            
            if(produto === null){
                continue;
            }

            produto.id = i;
            produtos.push(produto);
        }
        
        return produtos;
    }
    pesquisar(produto){
        let produtoFiltradas = Array();
        produtoFiltradas = this.recuperarTodosRegistros();

        //tipo
        if(produto.tipo != ''){
            produtoFiltradas = produtoFiltradas.filter(p => p.tipo == produto.tipo);
        }

        //descricao
        if(produto.descricao != ''){
            produtoFiltradas = produtoFiltradas.filter(p => p.descricao == produto.descricao);
        }

        //valor
        if(produto.valor != ''){
            produtoFiltradas = produtoFiltradas.filter(p => p.valor == produto.valor);
        }

        //quantidade
        if(produto.quantidade != ''){
            produtoFiltradas = produtoFiltradas.filter(p => p.quantidade == produto.quantidade);
        }
        
        return produtoFiltradas;
    }

     remover(id){
        localStorage.removeItem(id);
        window.location.reload();
    }

}
function removerP(id) {
    document.getElementById('modal_titulo').innerHTML = 'Deseja excluir o produto?';
    document.getElementById('modal_titulo_div').className = 'modal-header text-success';
    document.getElementById('modal_conteudo').innerHTML = 'Produto excluido com sucesso.';
    document.getElementById('modal_btn').innerHTML = 'Confirmar';
    document.getElementById('modal_btn').className = 'btn btn-danger';  
    $('#modalExcluirProduto').modal('show');
    $( document ).on( "click", "#modal_btn", function() {
        localStorage.removeItem(id);
        window.location.reload();
      }); 
   
    
     
}

class Bd {

    constructor(){
        let id = localStorage.getItem('id');
        
        if(id === null){
            localStorage.setItem('id',0)
        }
    }

    getProximoId(){
        let proximoId = localStorage.getItem('id');
        return parseInt(proximoId) + 1;
    }

    gravar(d){
        let id = this.getProximoId();
        
        localStorage.setItem(id,JSON.stringify(d));
        
        localStorage.setItem('id',id);
    }

    recuperarTodosRegistros(){
        let despesas = Array();
        let id = localStorage.getItem('id');

        //Recuperando despesas no localStorage
        for(let i = 1; i <= id; i++){
            let despesa = JSON.parse(localStorage.getItem(i));
            
            if(despesa === null){
                continue;
            }

            despesa.id = i;
            despesas.push(despesa);
        }
        
        return despesas;
    }

    pesquisar(despesa){
        let despesasFiltradas = Array();
        despesasFiltradas = this.recuperarTodosRegistros();
    
        //ano
        if(despesa.ano != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.ano == despesa.ano);
        }
           
        //mes
        if(despesa.mes != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.mes == despesa.mes);
        }

        //dia
        if(despesa.dia != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.dia == despesa.dia);
        }

        //tipo
        if(despesa.tipo != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.tipo == despesa.tipo);
        }

        //descricao
        if(despesa.descricao != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.descricao == despesa.descricao);
        }

        //valor
        if(despesa.valor != ''){
            despesasFiltradas = despesasFiltradas.filter(d => d.valor == despesa.valor);
        }
        
        return despesasFiltradas;
    }

    remover(id){
        localStorage.removeItem(id);

    }

}

let bd = new Bd();
let bdP = new BdProduto();

function cadastrarProduto(){
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');
    let produto = new Produto(tipo.value,descricao.value,valor.value,quantidade.value);
    if(produto.validarDados()){
        bdP.gravar(produto);
        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso';
        document.getElementById('modal_titulo_div').className = 'modal-header text-success';
        document.getElementById('modal_conteudo').innerHTML = 'Produto cadastrado com sucesso.';
        document.getElementById('modal_btn').innerHTML = 'Voltar';
        document.getElementById('modal_btn').className = 'btn btn-success';    
    
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
        quantidade.value='';
    }
    else{
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão do produto.';
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente.';
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir';
        document.getElementById('modal_btn').className = 'btn btn-danger'; 
        //ddd
    }
    $('#modalRegistraProduto').modal('show');
}
function cadastrarDespesa(){
    let ano = document.getElementById('ano');
    let mes = document.getElementById('mes');
    let dia = document.getElementById('dia');
    let tipo = document.getElementById('tipo');
    let descricao = document.getElementById('descricao');
    let valor = document.getElementById('valor');

    let despesa = new Despesa(ano.value,mes.value,dia.value,tipo.value,descricao.value,valor.value);
    
    if(despesa.validarDados()){
        bd.gravar(despesa);

        document.getElementById('modal_titulo').innerHTML = 'Registro inserido com sucesso';
        document.getElementById('modal_titulo_div').className = 'modal-header text-success';
        document.getElementById('modal_conteudo').innerHTML = 'Despesa cadastrada com sucesso.';
        document.getElementById('modal_btn').innerHTML = 'Voltar';
        document.getElementById('modal_btn').className = 'btn btn-success';    
       
        ano.value = '';
        mes.value = '';
        dia.value = '';
        tipo.value = '';
        descricao.value = '';
        valor.value = '';
    } 
    else{
        document.getElementById('modal_titulo').innerHTML = 'Erro na inclusão da despesa.';
        document.getElementById('modal_titulo_div').className = 'modal-header text-danger';
        document.getElementById('modal_conteudo').innerHTML = 'Erro na gravação, verifique se todos os campos foram preenchidos corretamente.';
        document.getElementById('modal_btn').innerHTML = 'Voltar e corrigir';
        document.getElementById('modal_btn').className = 'btn btn-danger';      
    }

    $('#modalRegistraDespesa').modal('show');
}

function carregarListaDespesas(despesas = Array(), filtro = false){
   
    if(despesas.length == 0 && !filtro){
        despesas = bd.recuperarTodosRegistros();
    }
    
    //Selecionando o elemento tbody da tabela
    let listaDespesas = document.getElementById('listaDespesas');
    listaDespesas.innerHTML = '';

    //percorrer o array despesas
    despesas.forEach(function(d){

        //criando linha
       let linha = listaDespesas.insertRow();

        //criando as colunas
        linha.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`;
       
        //ajustar o tipo
        switch(d.tipo){
            case '1': d.tipo = 'Alimentação';
                break;
            case '2': d.tipo = 'Educação';
                break;
            case '3': d.tipo = 'Lazer';
                break;
            case '4': d.tipo = 'Saúde';
                break;
            case '5': d.tipo = 'Transporte';
                break;
        }

        linha.insertCell(1).innerHTML = d.tipo;
        linha.insertCell(2).innerHTML = d.descricao;
        linha.insertCell(3).innerHTML = d.valor;

        //criar botão de exclusão
        let btn = document.createElement("button");
        btn.className = 'btn btn-danger';
        btn.innerHTML = '<i class="fas fa-times"></i>';
        btn.id = `id_despesa_${d.id}`;
        linha.insertCell(4).append(btn);
        btn.onclick = function(){
            let id = this.id.replace('id_despesa_','');
           bd.remover(id);
           window.location.reload();
        }
    });
}

function pesquisarDespesa(){
    let ano = document.getElementById('ano').value;
    let mes = document.getElementById('mes').value;
    let dia = document.getElementById('dia').value;
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;

    let despesa = new Despesa(ano,mes,dia,tipo,descricao,valor);
    let despesas = bd.pesquisar(despesa);
    carregarListaDespesas(despesas,true);

}

function carregarListaProdutos(produtos = Array(), filtro = false){
   
    if(produtos.length == 0 && !filtro){
        produtos = bdP.recuperarTodosRegistros();
    }
    
    //Selecionando o elemento tbody da tabela
    let listaProdutos = document.getElementById('listaProdutos');
    listaProdutos.innerHTML = '';

    //percorrer o array produtos
    produtos.forEach(function(p){

        //criando linha
       let linha = listaProdutos.insertRow();     
       
        //ajustar o tipo
        switch(p.tipo){
            case '1': p.tipo = 'Pc';
                break;
            case '2': p.tipo = 'Notebook';
                break;
            case '3': p.tipo = 'Teclado';
                break;
            case '4': p.tipo = 'Mouse';
                break;
            
        }
        linha.insertCell(0).innerHTML = p.tipo;
        linha.insertCell(1).innerHTML = p.descricao;
        linha.insertCell(2).innerHTML = p.valor;
        linha.insertCell(3).innerHTML = p.quantidade;

        //criar botão de exclusão
        let btn = document.createElement("button");
       
       
         linha.insertCell(4).innerHTML = `<tr data-id="${p.id}">
         <td> <div class="dropdown">
         <button class="btn btn-light" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <i class="fas fa-ellipsis-v"></i>
         </button>
         <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
           <a class="dropdown-item"href="javascript:void" onclick="removerP(${p.id})"><i class="far fa-trash-alt"  style="color:red" ></i> Excluir</a>
           <a class="dropdown-item" href="#">Another action</a>
           <a class="dropdown-item" href="#">Something else here</a>
         </div>
       </div>
       </td>`;
       
        
            
          
        
    });
}

function pesquisarProduto(){
    let tipo = document.getElementById('tipo').value;
    let descricao = document.getElementById('descricao').value;
    let valor = document.getElementById('valor').value;
    let quantidade = document.getElementById('quantidade').value;

    let produto = new Produto(tipo,descricao,valor,quantidade);
    let produtos = bdP.pesquisar(produto);
    carregarListaProdutos(produtos,true);

}

