import { Directive, ElementRef, HostListener, Input, forwardRef } from '@angular/core';
import { NG_VALIDATORS, FormControl, Validator } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { VALIDATION_MESSAGES } from './validation.constants';

@Directive({
  selector: '[validation]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: FormValidationDirective, multi: true }
  ]
})
export class FormValidationDirective implements Validator {

  @Input() name: string;
  @Input() ngModel: any;
  @Input() required: any;
  @Input() requiredMessage: string;

  @Input() equalTo: any;
  @Input() equalToElement: HTMLInputElement;
  @Input() equalToMessage: string;

  private isValid: boolean = true;
  private message: string;
  private validator: string;
  private validation: any;

  constructor(
    private element: ElementRef,
    private messageService: MessageService
  ) { }

  @HostListener('executeValidation') executeValidationEvent = () => {
    if(!this.element.nativeElement.validity.valid) {
      this.messageService.add({severity: 'error', detail: this.message});
    }
  };

  public validate(formValue: FormControl) {
    this.cleanCustomValidations();
    this.doValidation(formValue.value);
    if(this.isValid) return null;

    this.validation = {};
    this.validation[this.validator] = false;
    return this.validation;
  }

  private cleanCustomValidations = () => {
    this.isValid = true;
    this.message = undefined;
    this.validator = '';
    this.validation = undefined;
  };

  private doValidation = (value: any) => {
    if(this.isValid && this.element.nativeElement.attributes['required']) {
      this.validator = 'required';
      this.checkRequiredValidation(value);
    }
    if(this.isValid && this.equalTo) {
      this.validator = 'equalTo';
      this.checkEqualToValidation(value);
    }
    if(this.isValid && this.equalToElement) {
      this.validator = 'equalToElement';
      this.checkEqualToElementValidation(value);
    }
  };

  private checkRequiredValidation = (value: any) => {
    if(value === null || value === undefined) {
      this.isValid = false;
      this.message = this.requiredMessage
          ? this.requiredMessage
          : VALIDATION_MESSAGES.requiredMessage.replace('${name}', this.name);
      this.element.nativeElement.classList.remove('ng-pristine');
      this.element.nativeElement.classList.add('ng-dirty');
    }
  };

  private checkEqualToValidation = (value: any) => {
    if(value !== this.equalTo) {
      this.isValid = false;
      this.message = this.equalToMessage
          ? this.equalToMessage
          : VALIDATION_MESSAGES.equalToSimpleMessage;
      this.message = this.message.replace('${field1}', this.name);
      this.element.nativeElement.classList.remove('ng-pristine');
      this.element.nativeElement.classList.add('ng-dirty');
    }
  };

  private checkEqualToElementValidation = (value: any) => {
    if(value !== this.equalToElement.getAttribute('ng-reflect-model')) {
      this.isValid = false;
      this.message = this.equalToMessage
          ? this.equalToMessage
          : VALIDATION_MESSAGES.equalToComplexMessage;
      this.message = this.message.replace('${field1}', this.name)
                                 .replace('${field2}', this.equalToElement.name);
      this.element.nativeElement.classList.remove('ng-pristine');
      this.element.nativeElement.classList.add('ng-dirty');
    }
  };

}
