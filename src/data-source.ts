import * as dotenv from "dotenv";
import { join } from "path";
import { DataSource } from "typeorm";

dotenv.config({ path: join(__dirname, '../.env') });

export const AppDataSource = new DataSource({
    type: process.env.DATABASE_CONNECTION as 'postgres',
    host: process.env.DATABASE_HOST,
    port: Number(process.env.DATABASE_PORT),
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE_NAME,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/database/migrations/*{.ts,.js}'],
    synchronize: false,
    logging: true
})