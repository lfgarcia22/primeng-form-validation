# Directiva: form-validation

Valudador de formularios personalizado para Angular y PrimeNG.

_Leer en otro idioma: [Inglés](https://gitlab.com/von-development-studio/angular-libraries-source/form-validation/blob/master/README.md)_

## Requerimientos

* [Angular](https://angular.io/guide/quickstart) (v7.1.0)
* [PrimeNG](https://www.primefaces.org/primeng/#/setup) (v7.0.4)

## Instalación

1. Agregar el paquete a tu proyecto:

  ```
  npm install @von-development-studio/form-validation --save
  ```

2. Agrega el modulo: _**FormValidationModule**_ en la sección `imports`

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

* _**equalTo:**_ Verifica el valor actual de `[(ngModel)]` con el valor recibido en la directiva `[equalTo]`

  ```html
  <input name="equalToField" [(ngModel)]="value1" [equalTo]="value2" validation />
  ```

* _**equalToElement:**_ Verifica el valor actual con el valor del elemento recibido en la directiva `[equalToElement]`

  ```html
  <input #field1 name="field1" [(ngModel)]="value1" required validation />
  <input name="field2" [(ngModel)]="value2" [equalToElement]="field1" validation />
  ```

## Mensajes por defecto

* _**requiredMessage:**_ `The field ${name} is required`, necesita que el elemento HTML tenga el atributo `name`

* _**equalToSimpleMessage:**_ `The field ${field1} is not equal`, necesita que el elemento HTML tenga el atributo `name`. Válido con la directiva `equalTo`

* _**equalToComplexMessage:**_ `The field ${field1} is not equal to ${field2}`, necesita que el elemento HTML tenga el atributo `name`. Válido con la directiva `equalToElement`

## Mensajes personalizados

* _**equalToMessage:**_ Este mensaje remplazará _**equalToSimpleMessage**_ & _**equalToComplexMessage**_

<hr>

###### _[By Von Development Studio](https://www.von-development-studio.com/)_
