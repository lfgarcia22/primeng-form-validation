import { Directive, ElementRef, EventEmitter , HostListener, Input, Output, Renderer, ViewChild } from '@angular/core';

@Directive({
  selector: '[validate]'
})
export class FormValidateDirective {

  @Output('validate') customSubmit: EventEmitter<any> = new EventEmitter();

  constructor(
    private element: ElementRef,
    private renderer: Renderer
  ) { }

  @HostListener('submit', ['$event']) onSubmitEvent = (e: any) => {
    e.preventDefault();
    const elements = this.element.nativeElement.querySelectorAll('[validation]');
    let isValid: boolean = true;
    let isFocused: boolean = false;

    elements.forEach(el => {
      if(!el.validity.valid || el.classList.contains('ng-invalid')) {
        el.dispatchEvent(new Event('executeValidation'));
        isValid = false;
        if(!isFocused) {
          isFocused = true;
          el.focus();
        }
      }
    });
    if(isValid) {
      this.customSubmit.emit(e);
    }
  };

}
