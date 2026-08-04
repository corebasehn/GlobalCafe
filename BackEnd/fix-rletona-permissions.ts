import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const roleCodigo = 'RECEPCION_BASCULA_NOTAPESO';
  const permissionCodigo = 'VER_CATALOGOS';

  console.log(`Buscando permiso: ${permissionCodigo}...`);
  const permiso = await prisma.permiso.findUnique({
    where: { codigo: permissionCodigo }
  });

  if (!permiso) {
    console.log(`Error: El permiso ${permissionCodigo} no existe.`);
    return;
  }

  console.log(`Buscando rol: ${roleCodigo}...`);
  const rol = await prisma.rol.findUnique({
    where: { codigo: roleCodigo }
  });

  if (!rol) {
    console.log(`Error: El rol ${roleCodigo} no existe.`);
    return;
  }

  console.log(`Asignando permiso ${permissionCodigo} al rol ${roleCodigo}...`);
  await prisma.rolPermiso.upsert({
    where: {
      id_rol_id_permiso: {
        id_rol: rol.id_rol,
        id_permiso: permiso.id_permiso
      }
    },
    update: {},
    create: {
      id_rol: rol.id_rol,
      id_permiso: permiso.id_permiso
    }
  });

  console.log('✅ Permiso asignado exitosamente.');
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
