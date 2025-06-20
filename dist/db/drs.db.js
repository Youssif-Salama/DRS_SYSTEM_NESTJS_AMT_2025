"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const typeorm_1 = require("@nestjs/typeorm");
const admins_entity_1 = require("../shared/entities/admins.entity");
let DbModule = class DbModule {
};
exports.DbModule = DbModule;
exports.DbModule = DbModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule,
            typeorm_1.TypeOrmModule.forRootAsync({
                inject: [config_1.ConfigService],
                useFactory: (configService) => {
                    const isDevelopment = process.env.NODE_ENV === 'dev';
                    return {
                        type: 'postgres',
                        host: configService.get('envConfig.db.host'),
                        port: configService.get('envConfig.db.port'),
                        username: configService.get('envConfig.db.user'),
                        password: configService.get('envConfig.db.pass'),
                        database: configService.get('envConfig.db.name'),
                        entities: [admins_entity_1.AdminEntity],
                        synchronize: isDevelopment,
                        logging: isDevelopment,
                        ssl: !isDevelopment ? { rejectUnauthorized: false } : false,
                    };
                }
            })
        ],
        controllers: [],
        providers: [],
        exports: [],
    })
], DbModule);
//# sourceMappingURL=drs.db.js.map