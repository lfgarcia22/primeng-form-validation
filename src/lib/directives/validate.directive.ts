import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[validate]'
})
export class FormValidateDirective {

  @Output('validate') customSubmit: EventEmitter<any> = new EventEmitter();

  constructor(private element: ElementRef) { }

  @HostListener('submit', ['$event']) onSubmitEvent = (e: any) => {
    e.preventDefault();
    const elements = this.element.nativeElement.querySelectorAll('[validation]');
    let isValid = true;
    let isFocused = false;

    elements.forEach((el: any) => {
      const inputEl = this.getInputElement(el);
      if (!inputEl.validity.valid || inputEl.classList.contains('ng-invalid')) {
        el.dispatchEvent(new Event('executeValidation'));
        isValid = false;
        if (!isFocused) {
          isFocused = true;
          inputEl.focus();
        }
      }
    });
    if (isValid) {
      this.customSubmit.emit(e);
    }
  }

  private getInputElement = (el: any) => {
    if (el.tagName === 'P-CALENDAR' || el.tagName === 'P-AUTOCOMPLETE') {
      const inputEl = el.querySelector('input');
      return inputEl;
    }
    return el;
  }

}
