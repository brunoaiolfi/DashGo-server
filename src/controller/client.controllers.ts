import { Request, Response } from "express";
import {
  createClient,
  deleteClient,
  editClient,
  getAllClients,
  getClientById,
} from "../services/client.services";

export default {
  async create(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const { id } = res.locals;

      if (!id) return res.status(400).send("Id de usuário não encontrado!");

      const response = await createClient(name, id);

      return res.json({ ...response });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async edit(req: Request, res: Response) {
    try {
      const { name } = req.body;
      const id = Number(req.query.id);

      if (!id)
        return res.status(400).send("Preencha todos os campos corretamente!");

      const existentClient = await getClientById(id);

      if (!existentClient)
        return res.status(404).send("Cliente não encontrado!");

      const response = await editClient(name, id);

      return res.json({ ...response });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const { id } = res.locals;

      if (!id) return res.status(400).send("Id de usuário não encontrado!");

      const response = await getAllClients(id);
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

      const response = await getClientById(id);

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

      const existentClient = await getClientById(id);

      if (!existentClient)
        return res.status(404).send("Cliente não encontrado!");

      await deleteClient(id);

      return res.send("Cliente deletado com sucesso!");
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },
};
