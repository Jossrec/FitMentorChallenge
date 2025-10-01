import { prisma } from "./client.js";


async function findByEmail(email) {
  return prisma.user.findUnique({ where: { email } });
}

async function create({ email, password }) {
  const user = await prisma.user.create({
    data: { email, password },
  });
  return { id: user.id, email: user.email };
}


async function findById(id) {
  return prisma.user.findUnique({ where: { id } });
}

export const userRepo = {
  findByEmail,
  create,
  findById,
};
