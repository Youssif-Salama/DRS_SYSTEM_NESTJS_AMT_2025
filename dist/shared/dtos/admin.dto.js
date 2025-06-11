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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginAdminDto = exports.CreateAdminDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
class CreateAdminDto {
    name;
    password;
}
exports.CreateAdminDto = CreateAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin name',
        example: 'admin',
        required: true,
        type: String,
    }),
    (0, class_validator_1.MinLength)(3),
    (0, class_validator_1.MaxLength)(250),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin password',
        example: 'password@0001',
        required: true,
        type: String,
    }),
    (0, class_validator_1.MinLength)(8),
    (0, class_validator_1.Matches)(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'password too weak',
    }),
    __metadata("design:type", String)
], CreateAdminDto.prototype, "password", void 0);
class LoginAdminDto {
    name;
    password;
}
exports.LoginAdminDto = LoginAdminDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin name',
        example: 'admin',
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'admin password',
        example: 'password@0001',
        required: true,
        type: String,
    }),
    __metadata("design:type", String)
], LoginAdminDto.prototype, "password", void 0);
//# sourceMappingURL=admin.dto.js.map