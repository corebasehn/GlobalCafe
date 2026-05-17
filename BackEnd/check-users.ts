import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const users = await prisma.usuario.findMany({
    select: { id: true, usuario: true, correo: true, activo: true }
  });
  console.log('--- USUARIOS EN BASE DE DATOS ---');
  console.table(users);
}
main().finally(() => prisma.$disconnect());