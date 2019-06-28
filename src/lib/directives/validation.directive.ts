import { Directive, ElementRef, HostListener, Input, OnInit } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { VALIDATION_MESSAGES } from './validation.constants';

@Directive({
  selector: '[validation]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: FormValidationDirective, multi: true }
  ]
})
export class FormValidationDirective implements Validator, OnInit {

  @Input() customName: string;
  @Input() name: string;
  @Input() ngModel: any;
  @Input() required: boolean;
  @Input() requiredMessage: string;

  private validator: any = null;
  private message: string;
  private messages: any;
  private closestFormEl: any;

  constructor(
    private element: ElementRef,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.closestFormEl = this.element.nativeElement.form || this.getClosestForm(this.element.nativeElement);

    const isValidationEn = !this.closestFormEl.hasAttribute('validation-es');
    if (isValidationEn) {
      this.messages = VALIDATION_MESSAGES.EN;
    } else {
      this.messages = VALIDATION_MESSAGES.ES;
    }
  }

  validate(formValue: FormControl) {
    this.runHtmlValidations();
    return this.validator;
  }

  @HostListener('executeValidation') executeValidationEvent = () => {
    this.runHtmlValidations();
    if (this.validator && this.validator.required) {
      this.messageService.add({ severity: 'error', detail: this.message });
    }
  }

  private getClosestForm = (element: any) => {
    if (element.tagName === 'FORM' || element.tagName === 'BODY') {
      return element;
    }
    return this.getClosestForm(element.parentElement);
  }

  private getLabelInnerText = () => {
    const labelElement = this.closestFormEl.querySelector(`label[for='${this.name}']`);
    if (labelElement) {
      labelElement.classList.add('label-required');
      return this.customName || labelElement.innerText;
    }
    return undefined;
  }

  private runHtmlValidations = () => {
    this.validator = null;
    const labelText = this.getLabelInnerText();

    const isRequired = this.element.nativeElement.hasAttribute('required');
    if (isRequired && this.ngModel == null) {
      const message = this.requiredMessage || this.messages.requiredMessage;
      const name = labelText || this.name;
      this.message = message.replace('${name}', name);
      this.validator = { required: true };
    }
  }

}
