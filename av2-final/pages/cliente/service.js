import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$(document).ready(function () {
    loadTable();
});


//Atualizar a Tabela no mmento dos ajustes dos dados
async function refreshtable() {
    axios.get(url + 'clients', {
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
    await axios.put(url + 'clients' , {
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
        await axios.post(url + 'clients', {
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
    axios.get(url + 'clients', {
    }).then(function (response) {       
        var table= new DataTable("#table_clients", {
            responsive: true,
            data: response.data.clients,
            columns: [
                { data: 'id', title: 'id' },
                { data: 'name', title: 'nome' },
                { data: 'email', title: 'email' },
                { data: 'cpf', title: 'CPF' },
                { data: 'telephone', title: 'telefone' },
                { data: 'endereco', title: 'endereço' },
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
    const clients = await axios.get(url + 'clients/')
    const client = clients.data.clients.find(i => i.id == id)
    console.log(client)
    $("#id").val(client.id)
    $("#name").val(client.name)
    $("#codigo").val(client.codigo)
    $("#email").val(client.email)
    $("#telefone").val(client.telephone)
    $("#cpf").val(client.cpf)
    $("#endereco").val(client.endereco)
}

// Deletar objeto
async function deleteRecord(id) {
    await axios.delete(url + 'clients/' + id , {
    }).then(function (response) {
        alert("Registro Excluido com Sucesso");
        clear();
    }).catch(function (error) {
        console.log(error);
    });
}






    