import { ItemPurchase, Product, Stock } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import { CreateItemPurchase } from "../types/ItemPurchases";

const prisma = new PrismaClient();

export async function createPurchases(
  value: number,
  clientId: number,
  ItemPurchase: CreateItemPurchase[],
  userId: number
) {
  const response = await prisma.purchases.create({
    data: {
      value,
      clientId,
      userId,
      dtCreated: undefined,
      ItemPurchase: {
        create: ItemPurchase,
      },
    },
  });

  return { ...response, ItemPurchase: ItemPurchase };
}

export async function getAllPurchases(userId: number) {
  const response = await prisma.purchases.findMany({
    where: {
      userId,
    },
    include: {
      Client: undefined,
      ItemPurchase: {
        include: {
          product: undefined,
        },
      },
    },
  });

  return response;
}
