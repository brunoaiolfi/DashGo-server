import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getProductByName(name: string, userId: number) {
  const response = await prisma.product.findFirst({
    where: {
      userId,
      name,
    },
  });
  return response;
}

export async function createProduct(
  name: string,
  value: number,
  userId: number
) {
  const response = await prisma.product.create({
    data: {
      name,
      value,
      userId,
    },
  });

  return response;
}

export async function editProduct(name: string, value: number, id: number) {
  const response = await prisma.product.update({
    where: {
      id,
    },
    data: {
      name,
      value,
    },
  });

  return response;
}

export async function getAllProducts(userId: number) {
  const response = await prisma.product.findMany({
    where: {
      userId,
    },
  });

  return response;
}

export async function getProductById(id: number) {
  const response = await prisma.product.findFirst({
    where: {
      id,
    },
  });

  return response;
}

export async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: {
      id,
    },
  });
}
