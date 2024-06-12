import { getManager } from "typeorm";
import { IClientDelete, IClientRequest } from "../interfaces/iClient";
import { IProductDelete, IProductRequest } from "../interfaces/produtoInterface";
import { Client } from "../entity/Client";

export default class ClienteService {
    async get() {
        return await getManager().find(Client)
    }

    async delete({ id }: IClientDelete) {
        const client = getManager().findOne(Client, id)
        if (!client){
            throw new Error('Cliente não encontrada')
        }
        getManager().delete(Client, id)
        
        return 'Cliente deletado com sucesso';
    }

    async save({ id, codigo,
        nome,
        email,
        telefone,
        cpf,
        endereco }: IClientRequest) {

        const newClient = new Client()
        newClient.name = nome
        newClient.id = id,
        newClient.email = email
        newClient.codigo = codigo
        newClient.telephone = telefone
        newClient.cpf = cpf
        newClient.endereco = endereco
        getManager().save(Client, newClient)

        return 'salvo com sucesso';
    }
}