import { PipeTransform } from '@nestjs/common';
import { CreateAdminDto, LoginAdminDto } from 'src/shared/dtos/admin.dto';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { Repository } from 'typeorm';
import { BcryptUtilService } from '../utils/bcrypt.util';
export declare class CheckAdminExistPipe implements PipeTransform {
    private adminRepo;
    constructor(adminRepo: Repository<AdminEntity>);
    transform(value: CreateAdminDto): Promise<CreateAdminDto>;
}
export declare class IsAdminExistPipe implements PipeTransform {
    private adminRepo;
    constructor(adminRepo: Repository<AdminEntity>);
    transform(value: LoginAdminDto): Promise<LoginAdminDto>;
}
export declare class ChckPasswordIsValid implements PipeTransform {
    private readonly bcryptService;
    constructor(bcryptService: BcryptUtilService);
    transform(value: LoginAdminDto): Promise<LoginAdminDto & {
        id: number;
    }>;
}
