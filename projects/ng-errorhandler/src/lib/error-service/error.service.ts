import { Injectable } from '@angular/core';
import { PathLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ErrorContext } from '../error-context/error.context';

@Injectable()
export class ErrorService {

  constructor(
  ) { }

  public parseError(error: any): ErrorContext | ErrorContext[] {
    let ecArray = new Array<ErrorContext>();
    const ec = new ErrorContext(-1, '無可用的錯誤訊息');
    ec.name = error.name || undefined;
    // Timeout:  TimeoutError
    ec.time = new Date().getTime();
    const location = LocationStrategy;
    ec.url = location instanceof PathLocationStrategy ? location.path() : '';
    ec.status = error.status || undefined;

    if (error instanceof HttpErrorResponse) {
      if (error.error instanceof ErrorEvent) {
        ec.errorCode = -1;
        ec.errorMessage = error.error && error.error.message || '無可用的錯誤訊息';
      } else {
        if (typeof error.error.data !== 'undefined') {
          if (error.error.data !== null) {
            if (typeof error.error.data.amount !== 'undefined') {
              if (error.error.data.amount >= 1) {
                const detail = error.error.data.result;
                ecArray = detail.map((d: any) => {
                  const tempEc = new ErrorContext(d.errorCode, (d.errorMessage || '無可用的錯誤訊息'));
                  tempEc.name = error.name || undefined;
                  tempEc.time = new Date().getTime();
                  tempEc.url = location instanceof PathLocationStrategy ? location.path() : '';
                  tempEc.status = error.status || undefined;
                  tempEc.targetId = d.targetId;
                  tempEc.targetName = d.targetName;
                  return tempEc;
                });
              } else {
                ec.errorCode = error.error && error.error.errorCode || -1;
                ec.errorMessage = error.error && error.error.errorMessage || '無可用的錯誤訊息';
              }
            } else {
              ec.errorCode = error.error && error.error.errorCode || -1;
              ec.errorMessage = error.error && error.error.errorMessage || '無可用的錯誤訊息';
            }
          } else {
            ec.errorCode = error.error && error.error.errorCode || -1;
            ec.errorMessage = error.error && error.error.errorMessage || '無可用的錯誤訊息';
          }
        } else {
          if (error.status === undefined) {
            ec.errorCode = error.error && error.error.errorCode || -1;
            ec.errorMessage = error.error && error.error.errorMessage || '連接伺服器發生錯誤';
          } else {
            ec.errorCode = error.error && error.error.errorCode || -1;
            ec.errorMessage = error.error && error.error.errorMessage || '無可用的錯誤訊息';
          }
        }
      }
    } else {
      ec.errorCode = -1;
      ec.errorMessage = error.message || error.toString();
    }
    return (ecArray.length > 0) ? ecArray : ec;
  }

  public handleSuccess(resp: any) {
    if (resp.errorCode !== undefined) {
      if (resp.errorCode === 0) {
        return resp.data;
      } else {
        const errorContext = new ErrorContext(resp.errorCode, ( resp.errorMessage || '無可用的錯誤訊息'));
        errorContext.status = resp.status || undefined;
        throw errorContext;
      }
    } else {
      const errorContext = new ErrorContext(-1, '無可用的錯誤訊息');
      errorContext.status = resp.status || undefined;
      throw errorContext;
    }
  }

  public handleError(errorContext: ErrorContext | ErrorContext[]) {
    if (Array.isArray(errorContext)) {
      return throwError(errorContext);
    } else {
      if (errorContext.status !== undefined) {
        if (errorContext.status < 500) {
          return throwError(errorContext);
        } else {
          // TODO: router not work
          return throwError(errorContext);
        }
      } else {
        // TODO: router not work
        // timeout and server error
        return throwError(errorContext);
      }
    }

    // if (error.error instanceof ErrorEvent) {
    //   // A client-side or network error occurred. Handle it accordingly.
    //   console.error('An error occurred:', error.error.message);
    //   errorContext.errorCode = -1;
    //   errorContext.errorMessage = error.error.message;
    // } else {
    //   // The backend returned an unsuccessful response code.
    //   // The response body may contain clues as to what went wrong,
    //   errorContext = this.parseError(error);
    //   console.log('errorContext.status: ' + errorContext.status);
    // }
  }

}
