import { BcryptUtilService } from 'src/common/utils/bcrypt.util';
import { JwtUtilService } from 'src/common/utils/jwt.utils';
import { CreateAdminDto, LoginAdminDto } from 'src/shared/dtos/admin.dto';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { Repository } from 'typeorm';
export declare class AdminService {
    private readonly adminRepo;
    private readonly bcryptService;
    private readonly jwtService;
    constructor(adminRepo: Repository<AdminEntity>, bcryptService: BcryptUtilService, jwtService: JwtUtilService);
    createAdmin(data: CreateAdminDto): Promise<AdminEntity>;
    loginAdmin(data: LoginAdminDto & {
        id: number;
    }): Promise<{
        token: string;
    }>;
}
