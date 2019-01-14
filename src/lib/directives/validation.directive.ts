import { Directive, ElementRef, HostListener, Input } from '@angular/core';
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
  @Input() required: boolean;
  @Input() requiredMessage: string;

  private validator: any = null;
  private message: string;

  constructor(
    private element: ElementRef,
    private messageService: MessageService
  ) { }

  public validate(formValue: FormControl) {
    this.runHtmlValidations();
    return this.validator;
  }

  @HostListener('executeValidation') executeValidationEvent = () => {
    this.runHtmlValidations();
    if(this.validator && this.validator.required) {
      this.messageService.add({severity: 'error', detail: this.message});
    }
  };

  private runHtmlValidations = () => {
    this.validator = null;
    if(
      (
        this.element.nativeElement.attributes['required']
        && (this.required == null || this.required)
      )
      && this.ngModel === null || this.ngModel === undefined
    ) {
      this.message = ( this.requiredMessage
        ? this.requiredMessage
        : VALIDATION_MESSAGES.requiredMessage
      );
      this.message = this.message.replace('${name}', this.name);
      this.validator = { required: true };
    }
  }

}
