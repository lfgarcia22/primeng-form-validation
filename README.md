# Directive: form-validation

Custom form validation for Angular and PrimeNG.

_Read this in other language: [Spanish](https://gitlab.com/von-development-studio/angular-libraries-source/form-validation/blob/master/README.es.md)_

## Requirements

* [Angular](https://angular.io/guide/quickstart) (v7.1.0)
* [PrimeNG](https://www.primefaces.org/primeng/#/setup) (v7.0.4)

## Installing

1. Add NPM package into your project:

  ```
  npm install @von-development-studio/form-validation --save
  ```

2. Add _**FormValidationModule**_ into `imports` section

  ```typescript
  import { FormValidationModule } from '@von-development-studio/form-validation';

  ...

  @NgModule({
    imports: [
      ...
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

* _**equalTo:**_ Checks current `[(ngModel)]` value with parameter in `[equalTo]`

  ```html
  <input name="equalToField" [(ngModel)]="value1" [equalTo]="value2" validation />
  ```

* _**equalToElement:**_ Checks current `[(ngModel)]` value with element receive in `[equalToElement]`

  ```html
  <input #field1 name="field1" [(ngModel)]="value1" required validation />
  <input name="field2" [(ngModel)]="value2" [equalToElement]="field1" validation />
  ```

## Default validation messages

* _**requiredMessage:**_ `The field ${name} is required`, needs `name` attribute in HTML element

* _**equalToSimpleMessage:**_ `The field ${field1} is not equal`, needs `name` attribute in HTML element. Valid with `equalTo` directive

* _**equalToComplexMessage:**_ `The field ${field1} is not equal to ${field2}`, needs `name` attribute in HTML element. Valid with `equalToElement` directive

## Mensajes personalizados

* _**equalToMessage:**_ This message will replace _**equalToSimpleMessage**_ & _**equalToComplexMessage**_

<hr>

###### _[By Von Development Studio](https://www.von-development-studio.com/)_
