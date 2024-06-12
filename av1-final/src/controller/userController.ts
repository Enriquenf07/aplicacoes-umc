import { Request, Response } from "express";
import { UserService } from "../service/userService";

const userService = new UserService();

class UserController {
  async authenticate(request: Request, response: Response) {
    console.log('o')
    const { email, password } = request.body;

    const token = await userService.authenticate({
      email,
      password,
    });
    return response.json(token);
  }

  async get(request: Request, response: Response) {
    const users = await userService.get();
    return response.json({ users: users });
  }

  async delete(request: Request, response: Response) {
    try {
      const { id } = request.params;
      await userService.delete({ id });
      return response.json({ message: "Registro deletado com Sucesso" });
    } catch (e) {
      response.status(404).json({ message: e.message });
    }
  }

  async save(request: Request, response: Response) {
    const { name, email, admin = false, password, id} = request.body;
    const user = await userService.save({
      id,
      name,
      email,
      admin,
      password,
    });
    return response.json({ message: "Registro incluido com Sucesso" });
  }
}
export { UserController };