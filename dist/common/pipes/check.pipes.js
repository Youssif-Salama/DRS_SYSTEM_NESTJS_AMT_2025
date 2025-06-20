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
exports.ChckPasswordIsValid = exports.IsAdminExistPipe = exports.CheckAdminExistPipe = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const admins_entity_1 = require("../../shared/entities/admins.entity");
const typeorm_2 = require("typeorm");
const bcrypt_util_1 = require("../utils/bcrypt.util");
let CheckAdminExistPipe = class CheckAdminExistPipe {
    adminRepo;
    constructor(adminRepo) {
        this.adminRepo = adminRepo;
    }
    async transform(value) {
        const adminExistCheck = await this.adminRepo.findOne({
            where: { name: value.name },
        });
        if (adminExistCheck) {
            throw new common_1.ConflictException([`Wrong Credentials`]);
        }
        else {
            return value;
        }
    }
};
exports.CheckAdminExistPipe = CheckAdminExistPipe;
exports.CheckAdminExistPipe = CheckAdminExistPipe = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admins_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CheckAdminExistPipe);
let IsAdminExistPipe = class IsAdminExistPipe {
    adminRepo;
    constructor(adminRepo) {
        this.adminRepo = adminRepo;
    }
    async transform(value) {
        const isAdminExist = await this.adminRepo.findOne({ where: { name: value.name } });
        if (!isAdminExist) {
            throw new common_1.ConflictException([`Wrong Credentials`]);
        }
        else {
            value.isAdminExist = isAdminExist;
            return value;
        }
    }
};
exports.IsAdminExistPipe = IsAdminExistPipe;
exports.IsAdminExistPipe = IsAdminExistPipe = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(admins_entity_1.AdminEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], IsAdminExistPipe);
let ChckPasswordIsValid = class ChckPasswordIsValid {
    bcryptService;
    constructor(bcryptService) {
        this.bcryptService = bcryptService;
    }
    async transform(value) {
        const { password } = value;
        const adminFromPreviousPipe = value.isAdminExist;
        if (!adminFromPreviousPipe || typeof adminFromPreviousPipe.id === 'undefined' || !adminFromPreviousPipe.password) {
            throw new common_1.ConflictException([`User details are incomplete from a previous step.`]);
        }
        const { password: hashedPassword, id: adminId } = adminFromPreviousPipe;
        const isPasswordValid = await this.bcryptService.bcryptCompareUtil(password, hashedPassword);
        if (!isPasswordValid) {
            throw new common_1.ConflictException([`Bad Credentials`]);
        }
        ;
        return { ...value, id: adminId };
    }
};
exports.ChckPasswordIsValid = ChckPasswordIsValid;
exports.ChckPasswordIsValid = ChckPasswordIsValid = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bcrypt_util_1.BcryptUtilService])
], ChckPasswordIsValid);
//# sourceMappingURL=check.pipes.js.map