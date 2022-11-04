import { PrismaClient } from "@prisma/client";
import { generateHash } from "../utils/generateHash";

// Prisma client
const prisma = new PrismaClient();

export async function signIn(email: string, password: string) {
  const hashedPassword = generateHash(password);

  const response = await prisma.user.findFirst({
    where: {
      email,
      password: hashedPassword,
    },
  });

  return response;
}

export async function getUserByEmail(email: string) {
  const response = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return response;
}

export async function createUser(
  name: string,
  email: string,
  password: string,
  avatarUrl?: string
) {
  const hashedPassword = generateHash(password);
  const response = await prisma.user.create({
    data: {
      name,
      email,
      avatarUrl,
      amount: 0,
      password: hashedPassword,
    },
  });

  return { ...response, password: "" };
}

export async function editUser(
  id: number,
  email: string,
  name: string,
  avatarUrl?: string
) {
  const response = await prisma.user.update({
    where: {
      id,
    },
    data: {
      name,
      email,
      avatarUrl,
      dtEdited: new Date().toISOString(),
    },
  });

  return response;
}

export async function editUserPassword(id: number, password: string) {
  const response = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password,
    },
  });

  return response;
}

export async function editUserAmount(id: number, amount: number) {
  const response = await prisma.user.update({
    where: {
      id,
    },
    data: {
      amount,
    },
  });

  return response;
}

export async function getAllUser() {
  const response = await prisma.user.findMany();

  return response;
}

export async function getUserById(id: number) {
  const response = await prisma.user.findUnique({
    where: {
      id,
    },
  });

  return response;
}

export async function deleteUser(id: number) {
  const response = await prisma.user.delete({
    where: {
      id,
    },
  });

  return response;
}
