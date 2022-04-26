# NgErrorhandler

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.16.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

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

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
```sh
$ ng build ng-errorhandler
```

## Publishing

1.  修改 `ng-errorhandler\projects\ng-errorhandler\package.json` 中的版本號 `version`(下一個版本號，給使用lib的人看的) 
2.  執行指令，npm給project下版本號並壓上tag  
```sh
$ npm version [major|minor|patch]
```
3.  包版
```sh
$ npm run package
```
4.  發佈
```sh
$ npm publish dist/ng-errorhandler
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
