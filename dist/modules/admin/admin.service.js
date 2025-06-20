"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const bcrypt_util_1 = require("../../common/utils/bcrypt.util");
const jwt_utils_1 = require("../../common/utils/jwt.utils");
const admins_entity_1 = require("../../shared/entities/admins.entity");
const typeorm_2 = require("typeorm");
let AdminService = class AdminService {
    adminRepo;
    bcryptService;
    jwtService;
    constructor(adminRepo, bcryptService, jwtService) {
        this.adminRepo = adminRepo;
        this.bcryptService = bcryptService;
        this.jwtService = jwtService;
    }
    async createAdmin(data) {
        const { name, password } = data;
        const hashedPassword = this.bcryptService.bcryptHashingUtil(password);
        const newAdmin = this.adminRepo.create({ name, password: hashedPassword });
        return this.adminRepo.save(newAdmin);
    }
    async loginAdmin(data) {
        const { name, id } = data;
        const token = this.jwtService.generateToken({ name, id });
        return { token };
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admins_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        bcrypt_util_1.BcryptUtilService,
        jwt_utils_1.JwtUtilService])
], AdminService);
//# sourceMappingURL=admin.service.js.map