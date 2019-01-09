# Directiva: form-validation
Valudador de formularios personalizado para Angular y PrimeNG.

_Leer en otro idioma: [Inglés](README.md)_

## Requerimientos
* [Angular](https://angular.io/guide/quickstart) (v7.1.0)
* [PrimeNG](https://www.primefaces.org/primeng/#/setup) (v7.0.4)

## Instalación


## Uso
1. Agregar el atributo _**(validate)**_ (en vez de _**submit**_ o _**ngSubmit**_) & _**novalidate**_ en el tag de formulario:
```
<form (validate)="login()" novalidate>
```
1. En cada campo que deseas ejecutar las validaciones agrega el atributo _**validation**_:
```
<input validation type="text" name="username" [(ngModel)]="login.username" required />
```
  * Necesitas incluir el componente [```<p-toast></p-toast>```](https://www.primefaces.org/primeng/#/toast) en tu html

1.  El tipo de botón debe ser _**submit**_:
```
<button type="submit">Login</button>
```

## Options

* _**required**_ & _**requiredMessage:**_ Verifica campos no nulos


###### _By Von Development Studio_
