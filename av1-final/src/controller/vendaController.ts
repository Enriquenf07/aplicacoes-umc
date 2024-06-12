import { Request, Response } from "express";
import VendaService from "../service/vendaService";

const vendaService = new VendaService();

class VendaController {

  async get(request: Request, response: Response) {
    const vendas = await vendaService.get();
    return response.json({ vendas: vendas });
  }

  async delete(request: Request, response: Response) {
    const { id } = request.params;
    const venda = await vendaService.delete({ id });
    return response.json({ message: "Registro deletado com Sucesso" });
  }

  async save(request: Request, response: Response) {
    const {
      cliente,
      produto,
      quantidade,
      desconto,
      valorTotal, id
    } = request.body;
    await vendaService.save({
      id,
      cliente,
      produto,
      quantidade,
      desconto,
      valorTotal
    });
    return response.json({ message: "Registro incluido com Sucesso" });
  }
}
export { VendaController };