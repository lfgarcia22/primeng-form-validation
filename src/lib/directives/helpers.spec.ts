import { Component } from '@angular/core';

export const SubmitEventParameter = {
  preventDefault: () => {},
  dispatchEvent: (value: any) => {}
};

export const EXPECTED_REQUIRED_MESSAGE: string = 'Testing required fields';
export const INPUT_EXAMPLES: any = {
  required: `<input [(ngModel)]="toValidate" required validation />`,
  requiredWithMessage: `<input [(ngModel)]="toValidate" required requiredMessage="${EXPECTED_REQUIRED_MESSAGE}" validation />`,
  requiredVariableMessage: `<input [(ngModel)]="toValidate" required [requiredMessage]="requiredMessage" validation />`,
  equalTo: `<input [(ngModel)]="toValidate" [equalTo]="equalTo" validation />`
};

export class MockMessageService {
  public add = (object: any) => {};
}

@Component({
  template: `
    <form (validate)="doSubmit()">
      <input name="field1" [(ngModel)]="element.field1" validation required />
      <input name="field2" [(ngModel)]="element.field2" validation required />
      <button type="submit">Submit</button>
    </form>
  `
})
export class TestValidateComponent {
  public element: any = {};
  public doSubmit = () => {};
}

@Component({
  selector: 'test-correct-validation',
  template: ''
})
export class TestValidationComponent {
  public toValidate: any;
  public requiredMessage: string = EXPECTED_REQUIRED_MESSAGE;
  public equalTo: string = 'EQUAL';
}
