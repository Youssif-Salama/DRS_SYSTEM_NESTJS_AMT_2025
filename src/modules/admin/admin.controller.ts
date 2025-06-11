import { Body, Controller, Post, UseGuards, UsePipes } from '@nestjs/common';
import {
  ChckPasswordIsValid,
  CheckAdminExistPipe,
  IsAdminExistPipe,
} from 'src/common/pipes/check.pipes';
import { CreateAdminDto, LoginAdminDto } from 'src/shared/dtos/admin.dto';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { AdminService } from './admin.service';
import { ApiBody } from '@nestjs/swagger';
import { Throttle, ThrottlerGuard } from '@nestjs/throttler';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/create')
  @UsePipes(CheckAdminExistPipe)
  async create(@Body() data: CreateAdminDto): Promise<AdminEntity> {
    return this.adminService.createAdmin(data);
  }

  @ApiBody({
    type: LoginAdminDto,
  })
  @Throttle({ default: { limit: 5, ttl: 60000 } })
  @Post('/login')
  @UsePipes(IsAdminExistPipe, ChckPasswordIsValid)
  async login(
    @Body() data: LoginAdminDto & { id: number },
  ): Promise<{ token: string }> {
    return this.adminService.loginAdmin(data);
  }
}
