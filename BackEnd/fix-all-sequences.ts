import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const tables = ['rol', 'permiso', 'rol_permiso', 'usuario', 'usuario_rol'];
  for (const table of tables) {
    try {
      const pk = table === 'usuario' ? 'id' : (table === 'rol_permiso' ? 'id_rol_permiso' : (table === 'usuario_rol' ? 'id_usuario_rol' : `id_${table}`));
      await prisma.$executeRawUnsafe(`SELECT setval(pg_get_serial_sequence('"${table}"', '${pk}'), coalesce(max(${pk}),0) + 1, false) FROM "${table}";`);
      console.log(`Secuencia de ${table} arreglada.`);
    } catch (e) {
      console.error(`Error al arreglar secuencia de ${table}:`, e.message);
    }
  }
}
main().finally(() => prisma.$disconnect());