import { PrismaClient, User } from "@prisma/client";
import { generateHash } from "../utils/generateHash";

// Prisma client
const prisma = new PrismaClient();

// get user by email
export async function getUserByEmail(email: string) {
  // request user in database
  const response = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return response;
}

// Create user
export async function createUser(
  name: string,
  email: string,
  password: string,
  avatarUrl?: string
) {
  // Hash password
  const hashedPassword = generateHash(password);

  // Post user in database
  const response = await prisma.user.create({
    data: {
      email,
      name,
      password: hashedPassword,
      avatarUrl,
    },
  });

  return { ...response, password: "" };
}

export async function editUser({ avatarUrl, email, id, name }: User) {
  const response = await prisma.user.update({
    where: {
      id,
    },
    data: {
      avatarUrl,
      email,
      name,
    },
  });

  return response;
}

export async function editUsersPassword(id: number, password: string) {
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

export async function getAllUsers() {
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

export async function deleteUser(id: number) {
  const response = await prisma.user.delete({
    where: {
      id,
    },
  });

  return response;
}
