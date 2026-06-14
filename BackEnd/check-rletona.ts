import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const username = 'rletona';
  const user = await prisma.usuario.findUnique({
    where: { usuario: username },
    include: {
      roles: {
        include: {
          rol: {
            include: {
              permisos: {
                include: {
                  permiso: true
                }
              }
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

  console.log(`--- PERFIL DE USUARIO: ${user.usuario} ---`);
  console.log(`ID: ${user.id}`);
  console.log(`Nombre: ${user.nombre_visible}`);
  console.log(`Activo: ${user.activo}`);
  
  user.roles.forEach(ur => {
    console.log(`\nROL: ${ur.rol.nombre} (${ur.rol.codigo})`);
    console.log('PERMISOS:');
    ur.rol.permisos.forEach(rp => {
      console.log(` - [${rp.permiso.modulo}] ${rp.permiso.codigo}: ${rp.permiso.accion}`);
    });
  });
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());
