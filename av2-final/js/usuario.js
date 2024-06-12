import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$(document).ready(function () {
    loadTable();
});


//Atualizar a Tabela no mmento dos ajustes dos dados
async function refreshtable() {
    axios.get(url + 'users', {
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
    await axios.put(url + 'users' , {
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
        await axios.post(url + 'users', {
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
    axios.get(url + 'users', {
    }).then(function (response) {       
        var table= new DataTable("#table_User", {
            responsive: true,
            data: response.data.users,
            columns: [
                { data: 'id', title: 'id' },
                { data: 'name', title: 'nome' },
                { data: 'email', title: 'email' },
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
    await axios.get(url + 'users/' + id, {       
    }).then(function (response) {
        $("#id").val( response.data.id)
        $("#name").val(  response.data.name)
        $("#email").val(  response.data.email)
        if(  response.data.admin){
            admin= $("#admin").prop('checked:true')
        }
        //$("#selectP").val( response.profile.id)
    }).catch(function (error) {
        console.log(error);
    });
}

// Deletar objeto
async function deleteRecord(id) {
    await axios.delete(url + 'users/' + id , {
    }).then(function (response) {
        alert("Registro Excluido com Sucesso");
        clear();
    }).catch(function (error) {
        console.log(error);
    });
}






    