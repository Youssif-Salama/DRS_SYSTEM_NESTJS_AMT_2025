"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
class ResponseFormatInterceptor {
    intercept(context, next) {
        return next.handle().pipe((0, rxjs_1.map)((data) => {
            return {
                statusCode: context.switchToHttp().getResponse().statusCode,
                data,
                error: null,
                message: ['Success'],
            };
        }));
    }
}
exports.default = ResponseFormatInterceptor;
//# sourceMappingURL=response.format.interceptor.js.map