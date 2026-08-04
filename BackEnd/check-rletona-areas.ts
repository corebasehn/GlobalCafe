import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const username = 'rletona';
  const user = await prisma.usuario.findUnique({
    where: { usuario: username },
    include: {
      usuario_areas: {
        include: {
          area: {
            include: {
              sucursal: true
            }
          }
        }
      }
    }
  });

  if (!user) {
    console.log(`Usuario ${username} no encontrado.`);
    return;
  }

  console.log(`--- AREAS ASIGNADAS A: ${user.usuario} ---`);
  if (user.usuario_areas.length === 0) {
    console.log('No tiene áreas asignadas.');
  } else {
    user.usuario_areas.forEach(ua => {
      console.log(`- Area: ${ua.area.nombre} (Sucursal: ${ua.area.sucursal.nombre}, ID: ${ua.area.id_sucursal}) - Principal: ${ua.es_area_principal}`);
    });
  }
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
