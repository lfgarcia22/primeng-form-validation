import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormValidateDirective } from './validate.directive';
import { FormValidationDirective } from './validation.directive';
import { MessageService } from 'primeng/components/common/messageservice';
import { MockMessageService, SubmitEventParameter, TestValidateComponent } from './helpers.spec';

describe('Directive: validate', () => {

  let fixture: ComponentFixture<TestValidateComponent>;
  let component: TestValidateComponent;
  let formEl: DebugElement;
  let directive: FormValidateDirective;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        FormValidateDirective,
        FormValidationDirective,
        TestValidateComponent
      ],
      providers: [
        { provide: MessageService, useClass: MockMessageService },
        NgModel
      ]
    });
    fixture = TestBed.createComponent(TestValidateComponent);
    component = fixture.componentInstance;
    formEl = fixture.debugElement.query(By.directive(FormValidateDirective));
    directive = formEl.injector.get(FormValidateDirective);
  });

  it('Should execute submit method when form is valid', async () => {
    const submitEventSpy = spyOn<any>(component, 'doSubmit');
    component.element.field1 = 'Field 1';
    component.element.field2 = 'Field 2';

    fixture.detectChanges();
    formEl.triggerEventHandler('submit', SubmitEventParameter);

    expect(submitEventSpy).toHaveBeenCalled();
  });

  it('Should not execute submit method when form is not valid', async () => {
    const submitEventSpy = spyOn<any>(component, 'doSubmit');
    component.element.field1 = 'Field 1';

    fixture.detectChanges();
    formEl.triggerEventHandler('submit', SubmitEventParameter);

    expect(submitEventSpy).not.toHaveBeenCalled();
  });

});
