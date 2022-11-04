import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createClient(name: string, userId: number) {
  const response = await prisma.client.create({
    data: {
      name,
      userId,
    },
  });

  return response;
}
export async function editClient(name: string, id: number) {
  const response = await prisma.client.update({
    where: {
      id
    },
    data: {
      name,
    },
  });

  return response;
}

export async function getAllClients(userId: number) {
  const response = await prisma.client.findMany({
    where: {
      userId,
    },
  });
  return response;
}

export async function getClientById(id: number) {
  const response = await prisma.client.findUnique({
    where: {
      id,
    },
  });

  return response;
}

export async function deleteClient(id: number) {
  await prisma.client.delete({
    where: {
      id,
    },
  });
}
