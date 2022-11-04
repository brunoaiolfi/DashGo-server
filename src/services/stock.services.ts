import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function createStock(
  qntd: number,
  productId: number,
  userId: number
) {
  const response = await prisma.stock.create({
    data: {
      qntd,
      productId,
      userId,
    },
  });

  return response;
}

export async function getStockByIdProduct(productId: number) {
  const response = await prisma.stock.findFirst({
    where: {
      productId,
    },
    include: {
      product: undefined,
    },
  });

  return response;
}

export async function getStockById(id: number) {
  const response = await prisma.stock.findUnique({
    where: {
      id,
    },
    include: {
      product: undefined,
    },
  });

  return response;
}

export async function editStock(qntd: number, id: number) {
  const response = await prisma.stock.update({
    where: {
      id,
    },
    data: {
      qntd,
    },
  });

  return response;
}
export async function getAllStock() {
  const response = await prisma.stock.findMany({
    include: {
      product: undefined,
    },
  });

  return response;
}

export async function deleteStock(id: number) {
  await prisma.stock.delete({
    where: {
      id,
    },
  });
}
