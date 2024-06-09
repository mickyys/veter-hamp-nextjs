
## Getting Started
Pasos para iniciar el proyecto

```bash 
docker compose up -d

npm install
```

## Iniciar proyecto

```bash 
npm run dev
```

## Prisma
```bash 
npx prisma migrate dev --name authjs -yes
```


## Postgres
para conectarse por web a postgres se puede utilizar el cliente PG Admin creado en docker compose

### PG Admin
 - url http://localhost:8080/login
 - user: your@email.com
 - password: postgres

### Postgres Cloud
 - url: https://neon.tech/
 - username: github

### Server Cloud
 - url: https://vercel.com/
 - username: github