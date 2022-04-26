# NgErrorhandler

This library was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.0.

## Installation
```sh
$ npm install @cg/ng-errorhandler
```

## How to use

We have following feature
* Transfer Error to ErrorContext
* Handle Client Error
* Support general method to handle HttpClient

### Transfer error to ErrorContext
Add following to `app.module.ts` or your module
```ts
import { TransferErrorInterceptor } from '@cg/ng-errorhandler';
@NgModule({
  // ...
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TransferErrorInterceptor,
      multi: true
    }
  ]
  // ...
})
```

### Handle Client Error
`CgErrorHandler` ONLY work on **root module**.

So add following to `app.module.ts`
```ts
import { ErrorHandler } from '@angular/core';
import { CgErrorHandler } from '@cg/ng-errorhandler';
@NgModule({
  // ...
  providers: [
    {
      provide: ErrorHandler,
      useClass: CgErrorHandler,
    }
  ]
  // ...
})
```

### Support general method to handle HttpClient
First your http response body **MUST** be
```json
{
  "errorCode": 0,
  "errorMessage": "success",
  "data": {...}
}
```
`handleSuccess` would return `data` in http response body if `errorCode` is 0, 

and throw `ErrorContext` when `errorCode` is not 0.

`handleError` would return `ErrorContext`

In your service
```ts
import { ErrorService } from '@cg/ng-errorhandler';

constructor(private errorService: ErrorService) { }

getUser(userId: number): Observable<User> {
  return this.http
    .get<any>(`${this.userUrl}/${userId}`)
    .pipe(
      map(this.errorService.handleSuccess),
      catchError(this.errorService.handleError)
    );
}
```

## Code scaffolding

Run `ng generate component component-name --project ng-errorhandler` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module --project ng-errorhandler`.
> Note: Don't forget to add `--project ng-errorhandler` or else it will be added to the default project in your `angular.json` file. 

## Build

Run `ng build ng-errorhandler` to build the project. The build artifacts will be stored in the `dist/` directory.

## Publishing

After building your library with `ng build ng-errorhandler`, go to the dist folder `cd dist/ng-errorhandler` and run `npm publish`.

## Running unit tests

Run `ng test ng-errorhandler` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
