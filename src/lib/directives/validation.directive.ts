import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import { NgModel } from '@angular/forms';
import { VALIDATION_MESSAGES } from './validation.constants';

@Directive({
  selector: '[validation]',
  providers: [ NgModel ]
})
export class FormValidationDirective {

  @Input() name: string;
  @Input() ngModel: any;
  @Input() requiredMessage: string;

  private isValid: boolean = true;
  private message: string;

  constructor(
    private element: ElementRef,
    private messageService: MessageService
  ) { }

  @HostListener('executeValidation') executeValidationEvent = () => {
    this.doValidation();
    if(this.isValid) {
      return this.isValid;
    }
    this.element.nativeElement.classList.add('ng-dirty');
    this.messageService.add({severity: 'error', detail: this.message});
  };

  private doValidation = () => {
    if(this.isValid && this.element.nativeElement.attributes['required']) {
      this.checkRequiredValidation();
    }
  };

  private checkRequiredValidation = () => {
    if(this.ngModel === null || this.ngModel === undefined) {
      this.isValid = false;
      this.message = this.requiredMessage
        ? this.requiredMessage
        : VALIDATION_MESSAGES.requiredMessage.replace('${name}', this.name);
    }
  };

}
