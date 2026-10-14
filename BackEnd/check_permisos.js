const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const permisos = await prisma.permiso.findMany();
  console.log('Permisos en BD:');
  console.log(permisos.map(p => p.codigo));
}
main().finally(() => prisma.$disconnect());
