import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormValidationDirective } from './validation.directive';
import { MessageService } from 'primeng/components/common/messageservice';
import { EXPECTED_REQUIRED_MESSAGE, INPUT_EXAMPLES, MockMessageService, TestValidationComponent } from './helpers.spec';

describe('Directive: validation', () => {

  let fixture: ComponentFixture<TestValidationComponent>;
  let component: TestValidationComponent;
  let inputEl: DebugElement;
  let directive: FormValidationDirective;

  const setGlobalVariables = (template: string) => {
    fixture = TestBed.overrideComponent(TestValidationComponent, {
      set: {
        template: template
      }
    }).createComponent(TestValidationComponent);
    component = fixture.componentInstance;
    inputEl = fixture.debugElement.query(By.directive(FormValidationDirective));
    directive = inputEl.injector.get(FormValidationDirective);
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        FormValidationDirective,
        TestValidationComponent
      ],
      providers: [
        { provide: MessageService, useClass: MockMessageService },
        NgModel
      ]
    });
  });

  it('Should run valid required validation when component is required ', async () => {
    setGlobalVariables(INPUT_EXAMPLES.required);
    const checkRequiredValidationSpy = spyOn<any>(directive, 'checkRequiredValidation');

    component.toValidate = 'NOT NULL';
    fixture.detectChanges();
    inputEl.triggerEventHandler('executeValidation', null);

    expect(checkRequiredValidationSpy).toHaveBeenCalled();
    expect(directive.ngModel).toBe('NOT NULL');
    expect(directive['isValid']).toBeTruthy();
    expect(directive['message']).not.toBeDefined();
    expect(inputEl.nativeElement.classList).not.toContain('ng-invalid');
  });

  it('Should run invalid required validation when component is required ', async () => {
    setGlobalVariables(INPUT_EXAMPLES.required);

    fixture.detectChanges();
    directive['checkRequiredValidation']();

    expect(directive.ngModel).not.toBeDefined();
    expect(directive['isValid']).toBeFalsy();
    expect(directive['message']).toBeDefined();
    expect(inputEl.nativeElement.classList).toContain('ng-invalid');
  });

  it('Should show required message when attribute is added ', async () => {
    setGlobalVariables(INPUT_EXAMPLES.requiredWithMessage);

    fixture.detectChanges();
    directive['checkRequiredValidation']();

    expect(directive['isValid']).toBeFalsy();
    expect(directive['message']).toBe(EXPECTED_REQUIRED_MESSAGE);
  });

  it('Should show required message when input is added ', async () => {
    setGlobalVariables(INPUT_EXAMPLES.requiredVariableMessage);

    fixture.detectChanges();
    directive['checkRequiredValidation']();

    expect(directive['isValid']).toBeFalsy();
    expect(directive['message']).toBe(EXPECTED_REQUIRED_MESSAGE);
  });

});
