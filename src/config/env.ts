import 'dotenv/config';

export const env = {
  nodeEnv: process.env.NODE_ENV ?? 'development',
  port: Number(process.env.PORT ?? 3000),
  db: {
    host: process.env.DB_HOST!,
    port: Number(process.env.DB_PORT ?? 1433),
    user: process.env.DB_USER!,
    password: process.env.DB_PASSWORD!,
    name: process.env.DB_NAME!,
  },
  jwt: {
    secret: process.env.JWT_SECRET!,
    expiresIn: process.env.JWT_EXPIRES_IN ?? '1d',
  },
  bcryptSaltRounds: Number(process.env.BCRYPT_SALT_ROUNDS ?? 10),
};
