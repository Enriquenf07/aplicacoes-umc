import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$(document).ready(function () {
    loadTable();
});


//Atualizar a Tabela no mmento dos ajustes dos dados
async function refreshtable() {
    axios.get(url + 'categories', {
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
    await axios.put(url + 'categories' , {
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
        await axios.post(url + 'categories', {
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
    axios.get(url + 'categories', {
    }).then(function (response) {       
        var table= new DataTable("#table_categoria", {
            responsive: true,
            data: response.data.categories,
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
    const categories = await axios.get(url + 'categories/')
    const category = categories.data.categories.find(i => {
        console.log(i)
        return i.id == id
    })
    $("#id").val(category.id)
    $("#name").val(category.name)
    $("#codigo").val(category.codigo)
    $("#descricao").val(category.descricao)
}

// Deletar objeto
async function deleteRecord(id) {
    await axios.delete(url + 'categories/' + id , {
    }).then(function (response) {
        alert("Registro Excluido com Sucesso");
        clear();
    }).catch(function (error) {
        console.log(error);
    });
}






    