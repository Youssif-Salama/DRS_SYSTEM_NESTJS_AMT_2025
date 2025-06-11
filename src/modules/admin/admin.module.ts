import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { AdminService } from './admin.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { BcryptUtilService } from 'src/common/utils/bcrypt.util';
import { CheckAdminExistPipe, IsAdminExistPipe } from 'src/common/pipes/check.pipes';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports:[
    TypeOrmModule.forFeature([AdminEntity]),
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60000,
          limit: 10,
        },
      ],
    })
  ],
  controllers: [AdminController],
  providers: [AdminService,BcryptUtilService,CheckAdminExistPipe,IsAdminExistPipe,JwtUtilService,{
    provide:APP_GUARD,
    useClass:ThrottlerGuard
  }]
})
export class AdminModule {}
