import { Request, Response } from "express";
import ClienteService from "../service/clienteService";

const clientService = new ClienteService();

class ClientController {


  async get(request: Request, response: Response) {
    const clients = await clientService.get();
    return response.json({ clients: clients });
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      const client = await clientService.delete({ id });
      return response.json({ message: "Registro deletado com Sucesso" });
    } catch (e) {
      response.status(401).json({ message: "Registro não encontrado" });
    }
  }

  async save(request: Request, response: Response) {
    const {
      codigo,
      nome,
      email,
      id,
      telefone,
      cpf,
      endereco
    } = request.body;
    const client = await clientService.save({
      id,
      codigo,
      nome,
      email,
      telefone,
      cpf,
      endereco
    });
    return response.json({ message: "Registro incluido com Sucesso" });
  }
}
export { ClientController };