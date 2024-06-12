import { getManager } from "typeorm";
import { IProductDelete, IProductRequest } from "../interfaces/produtoInterface";
import { Product } from "../entity/Product";
import { Category } from "../entity/Category";

export default class ProductService {
    async get() {
        return await getManager().find(Product)
    }

    async delete({ id }: IProductDelete) {
        const product = getManager().findOne(Product, id)
        if (!product){
            throw new Error('Produto não encontrada')
        }
        getManager().delete(Product, id)

        return 'Produto deletado com sucesso';
    }

    async save({ nome, codigo, categoria, descricao, id }: IProductRequest) {

        const newProduct = new Product()
        newProduct.name = nome
        newProduct.id = id
        newProduct.category = await getManager().findOne(Category, categoria)
        newProduct.codigo = codigo
        newProduct.descricao = descricao
        getManager().save(Product, newProduct)
        return ''
    }
}