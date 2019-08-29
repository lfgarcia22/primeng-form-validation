# Directiva: primeng-form-validation

Validador de formularios personalizado para Angular y PrimeNG.

_Leer en otro idioma: [Inglés](https://github.com/lfgarcia22/primeng-form-validation/blob/snapshot/README.md)_

## Requerimientos

* [Angular](https://angular.io/guide/quickstart) (v7.1.0)
* [PrimeNG](https://www.primefaces.org/primeng/#/setup) (v7.0.4)

## Instalación

1. Agregar el paquete a tu proyecto:

  ```
  npm install @von-development-studio/primeng-form-validation --save
  ```

2. Agrega el modulo: _**FormValidationModule**_ en la sección `imports`

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

## Uso

1. Agregar el atributo _**(validate)**_ (en vez de _**submit**_ o _**ngSubmit**_) & _**novalidate**_ en el tag de formulario:

  ```html
  <form (validate)="login()" novalidate>
  ```

1. En cada campo que deseas ejecutar las validaciones agrega el atributo _**validation**_:

  ```html
  <input validation type="text" name="username" [(ngModel)]="login.username" required />
  ```

  * Necesitas incluir el componente [```<p-toast></p-toast>```](https://www.primefaces.org/primeng/#/toast) en tu html

1.  El tipo de botón debe ser _**submit**_:

  ```html
  <button type="submit">Login</button>
  ```

## Lista de directivas

* _**required:**_ Verifica campos no nulos

  ```html
  <input name="requiredField" [(ngModel)]="value" required validation />
  ```

## Mensajes por defecto

* _**requiredMessage:**_ `The field ${name} is required`, necesita que el elemento HTML tenga el atributo `name`

<hr>

###### _[By Von Development Studio](https://www.von-development-studio.com/)_
