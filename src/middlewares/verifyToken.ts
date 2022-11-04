import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { config } from "dotenv";
import { ITokenResponse } from "../interfaces/tokenResponse";

config();

const { SECRET } = process.env;
if (!SECRET) throw new Error("SECRET não encontrado nas variáveis de ambiente");

/**
 * Middleware de verificação de token
 *
 * armazena no locals o email e o id
 */
export async function verifyToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const bearerHeader = req.headers.authorization;

  if (!bearerHeader || typeof bearerHeader !== "string")
    return res.status(401).send("Token não fornecido!");

  const token =
    bearerHeader.indexOf("Bearer") < 0
      ? bearerHeader
      : bearerHeader.replace("Bearer ", "");

  try {
    const data = verify(token, String(SECRET)) as ITokenResponse;

    res.locals.email = data.email;
    res.locals.id = data.id;

    next();
  } catch (error) {
    console.log(error);
    return res.status(500).send("Token inválido!");
  }
}
