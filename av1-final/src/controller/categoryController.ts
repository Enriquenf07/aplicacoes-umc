import { Request, Response } from "express";
import CategoryService from "../service/categoryService";

const categoryService = new CategoryService();

class CategoryController {

  async get(request: Request, response: Response) {
    const category = await categoryService.get();

    return response.json({ categories: category });
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const category = await categoryService.delete({ id });
      return response.json({ message: "Registro deletado com Sucesso" });
    } catch (e) {
      response.status(401).json({message: "Registro não encontrado"});
    }

  }

  async save(request: Request, response: Response) {
    const {
      nome,
      id,
      codigo,
      descricao,
    } = request.body;
    const category = await categoryService.save({
      nome,
      codigo,
      descricao,
      id
    });
    return response.json({ message: "Registro incluido com Sucesso" });
  }
}
export { CategoryController };