import 'regenerator-runtime/runtime';
import axios from 'axios';
const url = "http://localhost:3000/"

$(document).ready(function () {
    loadTable();
    getCategorias()
});


//Atualizar a Tabela no mmento dos ajustes dos dados
async function refreshtable() {
    axios.get(url + 'products', {
    }).then(function (response) {
        var table = new DataTable("#table_User");
        table.destroy();
        $('#table_User').empty();
        loadTable();
    }).catch(function (error) {
        alert(error);
    });
}




$("#btnSalvar").click(async function () {
    try {
        await insert();
        //clear();
    } catch (errors) {
        console.error(errors);
    }
});
// Atualizar objeto
async function update() {
    await axios.put(url + 'products', {
        id: $("#id").val(),
        name: $("#name").val(),
        email: $("#email").val(), admin: $("#admin").prop('checked'),
        password: $("#password").val()
    }).then(function (response) {
        alert("Registro Atualizado com Sucesso");
        clear();
    }).catch(function (error) {
        console.log(error);
    });
}

async function insert() {
    try {
        await axios.post(url + 'products', {
            id: $("#id").val() != '' ? $("#id").val() : null,
            nome: $("#name").val(),
            descricao: $("#descricao").val(),
            codigo: $("#codigo").val() != '' ? $("#codigo").val() : null,
            categoria: $("#categorias").val(),
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
function loadTable() {
    axios.get(url + 'products', {
    }).then(function (response) {
        if (response.data.products.length === 0) {
            $("body").append("<p>Test</p>");
            return
        }
        var table = new DataTable("#table_products", {
            responsive: true,
            data: response.data.products,
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
            var data = table.row($(this).parents('tr')).data();
            if (this.id === 'edit') {
                loadUser(data.id);
            } else {
                deleteRecord(data.id);
            }
        });
    }).catch(function (error) {
        alert(error);
    });
}
// Carregar o Objeto
async function loadUser(id) {
    const products = await axios.get(url + 'products/')
    const produto = products.data.products.find(i => i.id == id)
    console.log(produto)
    $("#id").val(produto.id)
    $("#name").val(produto.name)
    $("#descricao").val(produto.descricao)
    $("#codigo").val(produto.codigo)
    
}

// Deletar objeto
async function deleteRecord(id) {
    await axios.delete(url + 'products/' + id, {
    }).then(function (response) {
        alert("Registro Excluido com Sucesso");
        clear();
    }).catch(function (error) {
        console.log(error);
    });
}

async function getCategorias() {
    const categorias = await axios.get(url + 'categories', {})
    console.log(categorias)
    categorias?.data?.categories.map(i => {
        $('#categorias').append(`<option value="${i.id}">${i.name}</option>`)
    })
}






