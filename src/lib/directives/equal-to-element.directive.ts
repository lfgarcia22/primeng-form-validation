import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { VALIDATION_MESSAGES } from './validation.constants';

@Directive({
  selector: '[equalToElement],[equalToElement][equalToMessage]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EqualToElementDirective, multi: true }
  ]
})
export class EqualToElementDirective implements Validator {

  @Input() name: string;
  @Input() equalToElement: any;
  @Input() equalToMessage: string;

  private validator: any = null;
  private message: string;

  constructor(
    private element: ElementRef,
    private messageService: MessageService
  ) { }

  public validate(formValue: FormControl) {
    this.validator = formValue.value !== this.equalToElement.getAttribute('ng-reflect-model') ? { equalToElement: true } : null;
    this.setValidation();
    return this.validator;
  }

  @HostListener('executeValidation') executeValidationEvent = () => {
    if (this.validator && this.validator.equalToElement) {
      this.messageService.add({ severity: 'error', detail: this.message });
    }
  }

  private setValidation = () => {
    if (this.validator && this.validator.equalToElement) {
      this.message = (this.equalToMessage
        ? this.equalToMessage
        : VALIDATION_MESSAGES.equalToSimpleMessage
      );
      this.message = this.message.replace('${field1}', this.name);
      this.element.nativeElement.classList.add('ng-equal-to');
    } else {
      this.element.nativeElement.classList.remove('ng-equal-to');
    }
  }

}
