import { Directive, ElementRef, EventEmitter , HostListener, Input, Output, Renderer, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

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
    let elements = this.element.nativeElement.querySelectorAll('[validation]');
    let isValid: boolean = true;

    elements.forEach(el => {
      if(!el.validity.valid) {
        if(isValid) el.focus();
        isValid = false;
        el.dispatchEvent(new Event('customBlur'));
      }
    });

    if(isValid) this.customSubmit.emit(e);
  };

}
