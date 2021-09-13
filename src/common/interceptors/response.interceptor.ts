import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { ResponseDto } from '../dtos/response.dto'

const excludePaths = ['/api/v1/auth/token/verify']

@Injectable()
export class HttpResponseInterceptor<T> implements NestInterceptor<T> {
  /**
   * Intercept the request and add the timestamp
   * @param context {ExecutionContext}
   * @param next {CallHandler}
   * @returns { payload:Response<T>, timestamp: string }
   */
  intercept(
    context: ExecutionContext,
    next: CallHandler
  ): Observable<ResponseDto<T>> {
    const request = context.switchToHttp().getRequest()
    const route = request?.route?.path
    if (excludePaths.includes(route)) {
      return next.handle()
    } else {
      const timestamp = new Date().toISOString()
      return next.handle().pipe(
        map((payload) => {
          return { payload: payload, timestamp: timestamp }
        })
      )
    }
  }
}
