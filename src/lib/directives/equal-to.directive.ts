import { Directive, ElementRef, HostListener, Input } from '@angular/core';
import { FormControl, NG_VALIDATORS, Validator } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';
import { VALIDATION_MESSAGES } from './validation.constants';

@Directive({
  selector: '[equalTo],[equalTo][equalToMessage]',
  providers: [
    { provide: NG_VALIDATORS, useExisting: EqualToDirective, multi: true }
  ]
})
export class EqualToDirective implements Validator {

  @Input() name: string;
  @Input() equalTo: any;
  @Input() equalToMessage: string;

  private validator: any = null;
  private message: string;

  constructor(
    private element: ElementRef,
    private messageService: MessageService
  ) { }

  public validate(formValue: FormControl) {
    this.validator = formValue.value !== this.equalTo ? { equalTo: true } : null;
    this.setValidation();
    return this.validator;
  }

  @HostListener('executeValidation') executeValidationEvent = () => {
    if (this.validator && this.validator.equalTo) {
      this.messageService.add({ severity: 'error', detail: this.message });
    }
  }

  private setValidation = () => {
    if (this.validator && this.validator.equalTo) {
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
