# Directive: primeng-form-validation

Custom form validation for Angular and PrimeNG.

_Read this in other language: [Spanish](https://github.com/lfgarcia22/primeng-form-validation/blob/snapshot/README.es.md)_

## Requirements

* [Angular](https://angular.io/guide/quickstart) (v7.1.0)
* [PrimeNG](https://www.primefaces.org/primeng/#/setup) (v7.0.4)

## Installing

1. Add NPM package into your project:

  ```
  npm install @von-development-studio/primeng-form-validation --save
  ```

2. Add _**FormValidationModule**_ into `imports` section

  ```typescript
  import { FormsModule } from '@angular/forms';
  import { FormValidationModule } from '@von-development-studio/primeng-form-validation';

  ...

  @NgModule({
    imports: [
      ...
      FormsModule,
      FormValidationModule,
      ...
    ]
  })
  export class AppModule { }
  ```

## Usage

1. Add attribute _**(validate)**_ (instead of _**submit**_ or _**ngSubmit**_) & _**novalidate**_ in form tag:

  ```html
  <form (validate)="login()" novalidate>
  ```

1. In each field you want to add a _**validation**_:

  ```html
  <input validation type="text" name="username" [(ngModel)]="login.username" required />
  ```

  * You need to include the component [```<p-toast></p-toast>```](https://www.primefaces.org/primeng/#/toast) in your html

1.  Your button type should be _**submit**_:

  ```html
  <button type="submit">Login</button>
  ```

## Directives

* _**required:**_ Checks null value

  ```html
  <input name="requiredField" [(ngModel)]="value" required validation />
  ```

## Default validation messages

* _**requiredMessage:**_ `The field ${name} is required`, needs `name` attribute in HTML element

<hr>

###### _[By Von Development Studio](https://www.von-development-studio.com/)_
