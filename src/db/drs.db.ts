import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AdminEntity } from "src/shared/entities/admins.entity";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>{
        const isDevelopment = process.env.NODE_ENV === 'dev';
        return{
          type:'postgres',
          host:configService.get<string>('envConfig.db.host'),
          port:configService.get<number>('envConfig.db.port'),
          username:configService.get<string>('envConfig.db.user'),
          password:configService.get<string>('envConfig.db.pass'),
          database:configService.get<string>('envConfig.db.name'),
          entities:[AdminEntity],
          synchronize: isDevelopment,
          logging: isDevelopment,
          ssl: !isDevelopment ? { rejectUnauthorized: false } : false,

        };
      }
    })
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DbModule {}