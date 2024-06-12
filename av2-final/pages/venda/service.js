import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$(document).ready(function () {
    loadTable();
    getFilters()
});


//Atualizar a Tabela no mmento dos ajustes dos dados
async function refreshtable() {
    axios.get(url + 'vendas', {
    }).then(function (response) {  
        var table= new DataTable("#table_User");   
        table.destroy();
        $('#table_User').empty();
        loadTable();           
    }).catch(function (error) {
        alert(error);
    });
}




$("#btnSalvar").click(async function () {
    try {
        if($("#id").val()== ""){
            await insert();
        } else{
            await update();
        }
        //clear();
    } catch (errors) {
        console.error(errors);
    }
});
// Atualizar objeto
async function update() {
    await axios.put(url + 'vendas' , {
        id:$("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(),        admin: $("#admin").prop('checked'),
        password: $("#password").val()
    }).then(function (response) {
        alert("Registro Atualizado com Sucesso");        
        clear();
    }).catch(function (error) {
        console.log(error);
    });
}

async function insert(){
    try {
        await axios.post(url + 'vendas', {
            name: $("#name").val(),
            email: $("#email").val(),
            admin: $("#admin").prop('checked'),
            password: $("#password").val(),
        }).then(function (response) {
            alert("Registro Incluído com Sucesso")
            clear();
        }).catch(function (error) {
            alert("Erro:" + error)
        });
    } catch (errors) {
        console.error(errors);
    }
}

//Função Limpar Formuláro
$("#btnLimpar").click(async function () {
    try {
        clear();
    } catch (errors) {
        console.error(errors);
    }
});




function clear() {
    $("#id").val(""),
        $("#name").val(""),
        $("#email").val(""),
        $("#admin").prop('checked', false),
        $("#password").val("");
    $("#selectP").val("");   
    refreshtable()
}

// carregar a tabela contendo a listagem dos dados caso exista nas paginas
function loadTable(){
    axios.get(url + 'vendas', {
    }).then(function (response) {    
        if (response.data.vendas.length === 0){
            $( "body" ).append( "<p>Sem itens</p>" );
            return
        }   
        var table= new DataTable("#table_categoria", {
            responsive: true,
            data: response.data.vendas,
            columns: [
                { data: 'id', title: 'id' },
                { data: 'name', title: 'nome' },
                { data: 'descricao', title: 'descricao' },
                { data: 'codigo', title: 'código' },
                {
                    data: null,
                    defaultContent: '<button id="edit">Editar</button>&nbsp;<button id="excluir">Excluir</button>',
                    targets: -1
                },
            ]
        });
        
        table.on('click', 'button', function (e) {
            var data = table.row( $(this).parents('tr') ).data();
            if(this.id==='edit'){
                loadUser(data.id);
            } else{
                deleteRecord(data.id);
            }          
        });       
    }).catch(function (error) {
        alert(error);
    });
}
// Carregar o Objeto
async function loadUser(id){
    const vendas = await axios.get(url + 'vendas/')
    const venda = vendas.data.vendas.find(i => i.id == id)
    console.log(venda)
    $("#id").val(venda.id)
    $("#cliente").val(venda.cliente)
    $("#produto").val(venda.produto)
    $("#codigo").val(venda.codigo)
    $("#quantidade").val(venda.quantidade)
    $("#desconto").val(venda.desconto)
    $("#valor").val(venda.valorTotal)
}

// Deletar objeto
async function deleteRecord(id) {
    await axios.delete(url + 'vendas/' + id , {
    }).then(function (response) {
        alert("Registro Excluido com Sucesso");
        clear();
    }).catch(function (error) {
        console.log(error);
    });
}
    
async function getFilters() {
    const clients = await axios.get(url + 'clients', {})
    console.log(clients)
    clients?.data?.clients.map(i => {
        $('#cliente').append(`<option value="${i.id}">${i.name}</option>`)
    })
    const products = await axios.get(url + 'products', {})
    console.log(products)
    products?.data?.products.map(i => {
        $('#produto').append(`<option value="${i.id}">${i.name}</option>`)
    })
}