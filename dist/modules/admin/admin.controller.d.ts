import { CreateAdminDto, LoginAdminDto } from 'src/shared/dtos/admin.dto';
import { AdminEntity } from 'src/shared/entities/admins.entity';
import { AdminService } from './admin.service';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    create(data: CreateAdminDto): Promise<AdminEntity>;
    login(data: LoginAdminDto & {
        id: number;
    }): Promise<{
        token: string;
    }>;
}
