import { Request, Response } from "express";
import { User } from "@prisma/client";
import {
  getUserByEmail,
  createUser,
  getAllUsers,
  signIn,
  editUser,
  getUserById,
  editUsersPassword,
  deleteUser,
} from "../services/user.services";
import { generateToken } from "../utils/generateToken";
import { generateHash } from "../utils/generateHash";

export default {
  async create(req: Request, res: Response) {
    try {
      const { email, avatarUrl, name, password }: User = req.body;

      // verify if values aren't undefined
      if (!email || !name || !password) {
        return res.status(400).send("Preencha todos os campos corretamente!");
      }

      // Verify if user already exists
      const user = await getUserByEmail(email);
      if (user) return res.status(409).send("Este e-mail já esta em uso!");

      // Post user
      const response = await createUser(
        name,
        email,
        password,
        avatarUrl ?? undefined
      );

      // return created user
      return res.json(response);
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async edit(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      const { email, avatarUrl, name } = req.body as User;

      console.log(email, avatarUrl, name, id);

      if (!email || !name || !id)
        return res.status(400).send("Preencha todos os campos corretamente!");

      const existentUser = await getUserByEmail(email);

      if (existentUser && existentUser?.id !== id)
        return res.status(409).send("Este e-mail já esta em uso!");

      const response = await editUser({
        avatarUrl,
        email,
        id,
        name,
        password: "",
      });

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

      const response = await editUsersPassword(id, hashedPassword);

      return res.json(response);
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);

      if (!id)
        return res.status(400).send("Preencha todos os campos corretamente!");

      const user = await getUserById(id);

      if (!user) return res.status(404).send("Usuário não encontrado!");

      await deleteUser(id);

      return res.send("Usuário deletado com sucesso!");
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const response = await getAllUsers();

      if (!response) return res.status(404).send("Nenhum usuário encontrado!");
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

      return res.json(response);
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async getByEmail(req: Request, res: Response) {
    try {
      const email = req.query.email;

      console.log(email);
      if (!email || typeof email !== "string")
        return res.status(400).send("Preencha todos os campos corretamente!");

      const response = await getUserByEmail(email);

      if (!response) return res.status(404).send("Nenhum usuário encontrado!");

      return res.json(response);
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
        token,
      });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },
};
