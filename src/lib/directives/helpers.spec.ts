import { Component } from '@angular/core';

export const SubmitEventParameter = {
  preventDefault: () => { },
  dispatchEvent: (value: any) => { }
};

export const EXPECTED_MESSAGES: any = {
  required: 'Testing required fields',
  equalTo: 'Testing equalTo fields'
};

export const INPUT_EXAMPLES: any = {
  required: `<input [(ngModel)]="toValidate" required validation />`,
  requiredWithMessage: `<input [(ngModel)]="toValidate" required requiredMessage="${EXPECTED_MESSAGES.required}" validation />`,
  requiredVariableMessage: `<input [(ngModel)]="toValidate" required [requiredMessage]="requiredMessage" validation />`,
  equalTo: `<input name="field1" [(ngModel)]="toValidate" [equalTo]="equalTo" validation />`,
  equalToElement: `<input #equalTo1 name="field1" [(ngModel)]="toValidate2" /><input name="field2"
    [(ngModel)]="toValidate" [equalToElement]="equalTo1" validation />`,
  equalToMessage: `<input name="field1" [(ngModel)]="toValidate" [equalTo]="equalTo" [equalToMessage]="equalToMessage" validation />`
};

export class MockMessageService {
  public add = (object: any) => { };
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
  public doSubmit = () => { };
}

@Component({
  selector: 'test-correct-validation',
  template: ''
})
export class TestValidationComponent {
  public toValidate: any;
  public toValidate2: any;
  public requiredMessage: string = EXPECTED_MESSAGES.required;
  public equalTo = 'EQUAL';
  public equalToMessage: string = EXPECTED_MESSAGES.equalTo;
}
