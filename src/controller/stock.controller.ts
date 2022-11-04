import { Stock } from "@prisma/client";
import { Request } from "express";
import { Response } from "express";
import {
  createProduct,
  deleteProduct,
  editProduct,
  getAllProducts,
  getProductById,
  getProductByName,
} from "../services/product.services";
import {
  createStock,
  editStock,
  getAllStock,
  getStockById,
  getStockByIdProduct,
} from "../services/stock.services";

export default {
  async create(req: Request, res: Response) {
    try {
      const { qntd, productId } = req.body;
      const { id } = res.locals;

      if (!id || !productId)
        return res.status(400).send("Preencha todos os campos corretamente!");

      const existentStockByProduct = await getStockByIdProduct(productId);

      if (existentStockByProduct)
        return res.status(400).send("Estoque já existente para este produto!");

      const response = await createStock(qntd, productId, id);

      return res.json({ ...response });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async edit(req: Request, res: Response) {
    try {
      const { qntd } = req.body;
      const id = Number(req.query.id);

      if (!id)
        return res.status(400).send("Preencha todos os campos corretamente!");

      const existentStock = await getStockById(id);

      if (!existentStock)
        return res.status(404).send("Estoque não encontrado!");

      const response = await editStock(qntd, id);

      return res.json({ ...response });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async delete(req: Request, res: Response) {
    try {
    } catch (error) {}
  },

  async getAll(req: Request, res: Response) {
    try {
      const response: Stock[] = await getAllStock();

      return res.json(response);
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);

      const response = await getStockById(id);

      if (!response) return res.status(404).send("Estoque não encontrado!");

      return res.json({ ...response });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },
};
