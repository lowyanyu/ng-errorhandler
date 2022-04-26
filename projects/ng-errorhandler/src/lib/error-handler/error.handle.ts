import { ErrorHandler, Injectable, Injector} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { ErrorService } from '../error-service/error.service';

@Injectable()
export class CgErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: Error | HttpErrorResponse) {
    const errorsService = this.injector.get<ErrorService>(ErrorService as any);
    console.error('error name: ' + error.name);
    console.error('error message: ' + error.message);
    console.error('http error occurred', error);
    const errorContext = errorsService.parseError(error);
    return throwError(errorContext);
  }

}
