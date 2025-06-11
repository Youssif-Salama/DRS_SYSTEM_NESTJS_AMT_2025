import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
export default class ResponseFormatInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<{
        statusCode: any;
        data: any;
        error: null;
        message: string[];
    }>;
}
