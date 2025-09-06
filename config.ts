import { registerAs } from '@nestjs/config';

export default registerAs('config', () => ({
    db: {
        connection: process.env.DATABASE_CONNECTION,
        host: process.env.DATABASE_HOST,
        database: process.env.DATABASE_NAME,
        username: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        port: process.env.DATABASE_PORT
    },
}))