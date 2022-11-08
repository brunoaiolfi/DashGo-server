import { Request, Response } from "express";
import {
  createUser,
  deleteUser,
  editUser,
  editUserPassword,
  getAllUser,
  getUserByEmail,
  getUserById,
  signIn,
} from "../services/user.services";
import { generateToken } from "../utils/generateToken";
import { generateHash } from "../utils/generateHash";
import { User } from "@prisma/client";

export default {
  async create(req: Request, res: Response) {
    try {
      const { email, avatarUrl, name, password }: User = req.body;

      if (!email || !name || !password) {
        return res.status(400).send("Preencha todos os campos corretamente!");
      }

      const existentUser = await getUserByEmail(email);
      if (existentUser)
        return res.status(409).send("Este e-mail já esta em uso!");

      const response = await createUser(
        name,
        email,
        password,
        avatarUrl ?? undefined
      );

      return res.json({ ...response, password: "" });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async edit(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      const { email, avatarUrl, name } = req.body as User;

      if (!email || !name || !id)
        return res.status(400).send("Preencha todos os campos corretamente!");

      const existentUser = await getUserByEmail(email);

      if (existentUser && existentUser?.id !== id)
        return res.status(409).send("Este e-mail já esta em uso!");

      const response = await editUser(id, email, name, avatarUrl ?? undefined);

      return res.json({ ...response, password: "" });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async editPassword(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      const { password } = req.body as User;

      const hashedPassword = generateHash(password);

      if (!id || !hashedPassword)
        return res.status(400).send("Preencha toos os campos corretamente!");

      const existentUser = await getUserById(id);

      if (!existentUser) return res.status(404).send("Usuário não encontrado!");

      const response = await editUserPassword(id, hashedPassword);

      return res.json({ ...response, password: "" });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);

      if (!id)
        return res.status(400).send("Preencha todos os campos corretamente!");

      const existentUser = await getUserById(id);

      if (!existentUser) return res.status(404).send("Usuário não encontrado!");

      await deleteUser(id);

      return res.send("Usuário deletado com sucesso!");
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const response = await getAllUser();

      if (!response.length)
        return res.status(404).send("Nenhum usuário encontrado!");
      return res.json(response);
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);

      if (!id)
        return res.status(400).send("Preencha todos os campos corretamente!");

      const response = await getUserById(id);

      if (!response) return res.status(404).send("Nenhum usuário encontrado!");

      return res.json({ ...response, password: "" });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async getByEmail(req: Request, res: Response) {
    try {
      const email = req.query.email;

      if (!email || typeof email !== "string")
        return res.status(400).send("Preencha todos os campos corretamente!");

      const response = await getUserByEmail(email);

      if (!response) return res.status(404).send("Nenhum usuário encontrado!");

      return res.json({ ...response, password: "" });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async getMe(req: Request, res: Response) {
    try {
      const { id } = res.locals;

      if (!id) return res.status(400).send("Id de usuário não encontrado!");

      const response = await getUserById(id);

      if (!response) return res.status(404).send("Dados não encontrados!");

      const token = generateToken(response);

      res.json({ ...response, password: "" });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async signIn(req: Request, res: Response) {
    try {
      const { email, password }: User = req.body;

      if (!email || !password)
        return res.status(400).send("Preencha todos os campos corretamente!");

      const response = await signIn(email, password);

      if (!response) return res.status(404).send("Nenhum usuário encontrado!");

      const token = generateToken(response);

      res.json({
        name: response.name,
        avatarUrl: response.avatarUrl,
        email: response.email,
        id: response.id,
        token,
        expiresIn: 60 * 60 * 12, // 12h
        loggedAt: new Date().toISOString(),
      });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },
};
