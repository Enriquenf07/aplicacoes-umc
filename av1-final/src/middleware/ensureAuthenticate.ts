import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
interface IPayload {
  sub: string;   email: string; }
export function ensureAuthenticated(
  request: Request,   response: Response,   next: NextFunction
) {
  // Receber o token
  const authToken = request.headers.authorization;
  // Validar se token está preenchido
  if (!authToken) {
    return response.status(401).end();
  }
  const [, token] = authToken.split(" ");
  try {
    // Validar se token é válido
    const { sub,email } = verify (
      token,
      "12345"
    ) as IPayload;
    return next();
  } catch (err) {
    return response.status(401).end();
  }
}