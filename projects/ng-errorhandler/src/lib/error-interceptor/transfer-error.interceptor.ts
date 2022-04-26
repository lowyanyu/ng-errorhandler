import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorService } from '../error-service/error.service';

@Injectable()
export class TransferErrorInterceptor implements HttpInterceptor {

  constructor(
    private errorService: ErrorService
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(resp => {
        const errorContext = this.errorService.parseError(resp);
        return throwError(errorContext);
      })
    );
  }

}
