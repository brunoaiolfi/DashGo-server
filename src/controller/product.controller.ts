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
  deleteStock,
  getStockByIdProduct,
} from "../services/stock.services";

export default {
  async create(req: Request, res: Response) {
    try {
      const { name, value } = req.body;
      const { id } = res.locals;

      if (!id) return res.status(400).send("Id de usuário não encontrado!");

      const existentProduct = await getProductByName(name, id);

      if (existentProduct)
        return res.status(400).send("Este produto já existe!");

      const response = await createProduct(name, value, id);

      await createStock(0, response.id, id);

      return res.json({ ...response });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async edit(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);
      const { name, value } = req.body;

      if (!id)
        return res.status(400).send("Preencha todos os campos corretamente!");

      const existentProductById = await getProductById(id);

      if (!existentProductById)
        return res.status(400).send("Produto não encontrado!");

      const existentProductByName = await getProductByName(name, id);

      if (existentProductByName && existentProductByName.id !== id)
        return res.status(400).send("Este produto já existe!");

      const response = await editProduct(name, value, id);

      return res.json({ ...response });
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const id = Number(req.query.id);

      if (!id)
        return res.status(400).send("Preencha todos os campos corretamente!");

      const existentProduct = await getProductById(id);

      if (!existentProduct)
        return res.status(404).send("Produto não encontrado!");

      const productStock = await getStockByIdProduct(id);
      if (productStock) await deleteStock(productStock?.id);

      await deleteProduct(id);

      return res.send("Cliente deletado com sucesso!");
    } catch (error) {
      console.log(error);
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const { id } = res.locals;

      if (!id) return res.status(400).send("Id de usuário não encontrado!");

      const response = await getAllProducts(id);
      if (!response.length)
        return res.status(404).send("Nenhum produto encontrado!");

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

      const response = await getProductById(id);
      if (!response) return res.status(404).send("Nenhum produto encontrado!");

      return res.json(response);
    } catch (error) {
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },
};
