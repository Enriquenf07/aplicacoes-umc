import { getManager } from "typeorm";
import { ICategoryDelete, ICategoryRequest } from "../interfaces/iCategory";
import { IProductDelete, IProductRequest } from "../interfaces/produtoInterface";
import { Category } from "../entity/Category";

export default class CategoryService {
    async get() {
        return await getManager().find(Category)
    }

    async delete({ id }: ICategoryDelete) {
        const category = getManager().findOne(Category, id)
        if (!category){
            throw new Error('Categoria não encontrada')
        }
        getManager().delete(Category, id)
        
        return 'Categoria deletada com sucesso';
    }
    async save({
        nome,
        codigo,
        descricao,
        id
    }: ICategoryRequest) {
        const newCategory = new Category()
        newCategory.name = nome
        newCategory.id = id
        newCategory.descricao = descricao
        newCategory.codigo = codigo
        getManager().save(Category, newCategory)
        return 'salvo com sucesso';
    }
}