## PRISMA COMMANDS

```
npx prisma init
npx prisma migrate dev
npx prisma generate
npx prisma pull // este comando genera un esquema de prisma en base a una base de datos creada
npx prisma db push // este comando manda los cambios hechos en el esquema a la base de datos sin pasar por migraciones
npx prisma migrate reset // para resetear la base de datos, esto borra todos los datos
```
