import { Directive, ElementRef, HostListener, Input, Renderer, ViewChild } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

@Directive({
  selector: '[validation]'
})
export class FormValidationDirective {

  @Input() requiredMessage: string;
  private message: string = '';

  constructor(
    private element: ElementRef,
    private renderer: Renderer,
    private messageService: MessageService
  ) { }

  @HostListener('customBlur') onBlurEvent = () => {
    if(!this.element.nativeElement.validity.valid) {
      this.element.nativeElement.classList.add('ng-dirty');
      this.checkValidation();
      this.messageService.add({severity: 'error', detail: this.message});
    }
  };

  private checkValidation = () => {
    if(this.requiredMessage != null) this.message = this.requiredMessage;
    else this.message = this.element.nativeElement.validationMessage;
  };

}
