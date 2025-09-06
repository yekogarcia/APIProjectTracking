import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigType } from '@nestjs/config';

import config from '../../config';

type SupportedDB = 'postgres' | 'mysql' | 'mariadb' | 'sqlite';

@Global()
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigType<typeof config>) => {
                const {connection, host, database, password, username, port } = configService.db;
                return {
                    type: connection as SupportedDB,
                    host,
                    port: Number(port),
                    database,
                    username,
                    password,
                    autoLoadEntities: true,
                    synchronize: false,
                }
            },
            inject: [config.KEY],
        })
    ],
    providers: [],
    exports: [TypeOrmModule],
})
export class DatabaseModule { }
