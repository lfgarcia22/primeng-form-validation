import { Component } from '@angular/core';

export const INPUT_EXAMPLES: any = {
  required: `<input [(ngModel)]="toValidate" required validation />`
};

export class MockMessageService {
  public add = (object: any) => {};
}

@Component({
  selector: 'test-correct-validation',
  template: ''
})
export class TestValidationComponent {
  public toValidate: any;
}
