import { ItemPurchase, Product } from "@prisma/client";
import { Response } from "express";
import { Request } from "express";
import {
  createPurchases,
  getAllPurchases,
} from "../services/purchases.services";
import { editStock, getStockByIdProduct } from "../services/stock.services";
import {
  CreateItemPurchase,
  ItemPurchaseIncludeProduct,
} from "../types/ItemPurchases";

interface ICreateBody {
  itemsPurchases: CreateItemPurchase[];
  clientId: number;
  totalValue: number;
}
export default {
  async create(req: Request, res: Response) {
    try {
      const { clientId, itemsPurchases, totalValue }: ICreateBody = req.body;
      const { id: userId } = res.locals;

      console.log(totalValue, clientId, itemsPurchases, userId);
      
      if (!clientId || !itemsPurchases.length || !userId || !totalValue)
        return res.status(400).send("Preencha todos os campos corretamente!");

      const response = await createPurchases(
        totalValue,
        clientId,
        itemsPurchases,
        userId
      );

      for (const item of itemsPurchases) {
        const stock = await getStockByIdProduct(item.productId);

        if (stock) {
          const newStockQntd = stock.qntd - item.qntd;

          await editStock(newStockQntd, stock.id);
        }
      }

      return res.json({ ...response });
    } catch (error) {
      console.log(error);
      return res.status(500).send("Ocorreu um erro interno!");
    }
  },

  async getAll(req: Request, res: Response) {
    try {
      const { id } = res.locals;
      const response = await getAllPurchases(id);

      if (!response.length) {
        return res.status(404).send("Nenhuma compra encontrada!");
      }

      return res.json(response);
    } catch (error) {
      console.log(error);
      return res.status(500).send("Ocorreu um erro no servidor!");
    }
  },
};
