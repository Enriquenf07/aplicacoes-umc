import { getManager } from "typeorm";
import { Venda } from "../entity/Venda";
import { IVendaDelete, IVendaRequest } from "../interfaces/iVenda";
import { IProductDelete, IProductRequest } from "../interfaces/produtoInterface";
import { Client } from "../entity/Client";
import { Product } from "../entity/Product";

export default class VendaService {
    async get() {

        return await getManager().find(Venda)
    }

    async delete({ id }: IVendaDelete) {
        const venda = getManager().findOne(Venda, id)
        if (!venda){
            throw new Error('Venda não encontrada')
        }
        getManager().delete(Venda, id)
        return 'Venda deletada com sucesso';
    }

    async save({
        id,
        cliente,
        produto,
        quantidade,
        desconto,
        valorTotal
    }: IVendaRequest) {

        const newVenda = new Venda()
        newVenda.id = id
        newVenda.client = await getManager().findOne(Client, cliente)
        newVenda.product = await getManager().findOne(Product, produto)
        getManager().save(Venda, newVenda)

        return 'salvo com sucesso';
    }
}