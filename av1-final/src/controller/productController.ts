import { Request, Response } from "express";
import ProductService from "../service/productService";

const productService = new ProductService();

class ProductController {

  async get(request: Request, response: Response) {
    const products = await productService.get();
    return response.json({ products: products });
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const product = await productService.delete({ id });
      return response.json({ message: "Registro deletado com Sucesso" });
    } catch (e) {
      response.status(401).json({ message: e.message});
    }
  }

  async save(request: Request, response: Response) {
    const {
      id,
      nome,
      codigo,
      descricao,
      categoria,
    } = request.body;
    const product = await productService.save({
      id,
      nome,
      codigo,
      descricao,
      categoria,
    });
    return response.json({ message: "Registro incluido com Sucesso" });
  }
}
export { ProductController };