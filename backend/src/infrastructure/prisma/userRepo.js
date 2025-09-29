import { prisma } from "./client.js";

export const userRepo = {
  findByEmail: (email) => prisma.user.findUnique({ where: { email } }),
  create: (data) => prisma.user.create({ data })
};
