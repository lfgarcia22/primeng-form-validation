# Directive: form-validation
Custom form validation for Angular and PrimeNG.

_Read this in other language: [Spanish](https://gitlab.com/von-development-studio/angular-libraries-source/form-validation/blob/master/README.es.md)_

## Requirements
* [Angular](https://angular.io/guide/quickstart) (v7.1.0)
* [PrimeNG](https://www.primefaces.org/primeng/#/setup) (v7.0.4)

## Installing


## Usage
1. Add attribute _**(validate)**_ (instead of _**submit**_ or _**ngSubmit**_) & _**novalidate**_ in form tag:
```
<form (validate)="login()" novalidate>
```
1. In each field you want to add a _**validation**_:
```
<input validation type="text" name="username" [(ngModel)]="login.username" required />
```
  * You need to include the component [```<p-toast></p-toast>```](https://www.primefaces.org/primeng/#/toast) in your html

1.  Your button type should be _**submit**_:
```
<button type="submit">Login</button>
```

## Options

* _**required**_ & _**requiredMessage:**_ Will check not null values


###### _By Von Development Studio_
