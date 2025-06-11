import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BcryptUtilService } from 'src/common/utils/bcrypt.util';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { CreateAdminDto, LoginAdminDto } from 'src/shared/dtos/admin.dto';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepo: Repository<AdminEntity>,
    private readonly bcryptService: BcryptUtilService,
    private readonly jwtService: JwtUtilService,
  ) {}

  async createAdmin(data: CreateAdminDto): Promise<AdminEntity> {
    const { name, password } = data;
    const hashedPassword = this.bcryptService.bcryptHashingUtil(password);
    const newAdmin = this.adminRepo.create({ name, password: hashedPassword });
    return this.adminRepo.save(newAdmin);
  }

  async loginAdmin(
    data: LoginAdminDto & { id: number },
  ): Promise<{token:string}> {
    const { name, id } = data;
    const token = this.jwtService.generateToken({ name, id });
    return {token}
  }
}
