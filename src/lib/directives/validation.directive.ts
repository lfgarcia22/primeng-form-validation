import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { VALIDATION_MESSAGES } from './validation.constants';

@Directive({
  selector: '[validation]'
})
export class FormValidationDirective {

  @Input() name: string;
  @Input() ngModel: any;
  @Input() required: any;
  @Input() requiredMessage: string;

  @Input() equalTo: any;
  @Input() equalToElement: HTMLInputElement;
  @Input() equalToMessage: string;

  private isValid: boolean = true;
  private message: string;

  constructor(
    private element: ElementRef,
    private messageService: MessageService
  ) { }

  @HostListener('blur') onBlurEvent = () => {
    this.doValidation();
  };

  @HostListener('executeValidation') executeValidationEvent = () => {
    this.doValidation();
    if(!this.element.nativeElement.classList.contains('ng-invalid')) {
      return;
    }
    this.messageService.add({severity: 'error', detail: this.message});
  };

  private doValidation = () => {
    this.element.nativeElement.classList = [];
    if(this.isValid && this.element.nativeElement.attributes['required']) {
      this.checkRequiredValidation();
    }
    if(this.isValid && this.equalTo) {
      this.checkEqualToValidation();
    }
    if(this.isValid && this.equalToElement) {
      this.checkEqualToElementValidation();
    }
  };

  private checkRequiredValidation = () => {
    if(this.ngModel === null || this.ngModel === undefined) {
      this.isValid = false;
      this.message = this.requiredMessage
          ? this.requiredMessage
          : VALIDATION_MESSAGES.requiredMessage.replace('${name}', this.name);
      this.element.nativeElement.classList.add('ng-dirty', 'ng-invalid', 'ng-required');
    }
  };

  private checkEqualToValidation = () => {
    if(this.ngModel !== this.equalTo) {
      this.isValid = false;
      this.message = this.equalToMessage
          ? this.equalToMessage
          : VALIDATION_MESSAGES.equalToSimpleMessage;
      this.message = this.message.replace('${field1}', this.name);
      this.element.nativeElement.classList.add('ng-dirty', 'ng-invalid', 'ng-equal-to');
    }
  };

  private checkEqualToElementValidation = () => {
    if(this.ngModel !== this.equalToElement.getAttribute('ng-reflect-model')) {
      this.isValid = false;
      this.message = this.equalToMessage
          ? this.equalToMessage
          : VALIDATION_MESSAGES.equalToComplexMessage;
      this.message = this.message.replace('${field1}', this.name)
                                 .replace('${field2}', this.equalToElement.name);
      this.element.nativeElement.classList.add('ng-dirty', 'ng-invalid', 'ng-equal-to');
    }
  };

}
