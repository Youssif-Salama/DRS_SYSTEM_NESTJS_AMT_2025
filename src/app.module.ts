import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AdminModule } from './modules/admin/admin.module';
import envConfig from './config/env.config';
import { DbModule } from './db/drs.db';
import * as path from 'path';

let envPath:string;
switch (process.env.NODE_ENV) {
  case 'production':
    envPath = path.resolve(__dirname, '../../.env.prod');
    break;
  case 'development':
    envPath = path.resolve(__dirname, '../../.env.dev');
    break;
  default:
    envPath = path.resolve(__dirname, '../../.env.dev');
}




@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true,
      load:[envConfig],
      envFilePath:envPath
    }),
    DbModule,
    AdminModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
