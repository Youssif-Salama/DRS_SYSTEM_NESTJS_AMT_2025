import { ConfigService } from '@nestjs/config';
export declare class JwtUtilService {
    private envConfig;
    constructor(envConfig: ConfigService);
    generateToken(data: any): any;
    verifyToken(token: string): any;
    decodeToken(token: string): any;
}
