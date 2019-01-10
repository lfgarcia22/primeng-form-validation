import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormsModule, NgModel } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormValidationDirective } from './validation.directive';
import { MessageService } from 'primeng/components/common/messageservice';
import { EXPECTED_MESSAGES, INPUT_EXAMPLES, MockMessageService, TestValidationComponent } from './helpers.spec';

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

  it('Should run valid required validation when component is required', async () => {
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

  it('Should run invalid required validation when component is required', async () => {
    setGlobalVariables(INPUT_EXAMPLES.required);

    fixture.detectChanges();
    directive['doValidation']();

    expect(directive.ngModel).not.toBeDefined();
    expect(directive['isValid']).toBeFalsy();
    expect(directive['message']).toBeDefined();
    expect(directive['message']).not.toContain('${name}');
    expect(inputEl.nativeElement.classList).toContain('ng-invalid');
  });

  it('Should show required message when attribute is added', async () => {
    setGlobalVariables(INPUT_EXAMPLES.requiredWithMessage);

    fixture.detectChanges();
    directive['doValidation']();

    expect(directive['isValid']).toBeFalsy();
    expect(directive['message']).toBe(EXPECTED_MESSAGES.required);
    expect(directive['message']).not.toContain('${name}');
  });

  it('Should show required message when input is added', async () => {
    setGlobalVariables(INPUT_EXAMPLES.requiredVariableMessage);

    fixture.detectChanges();
    directive['doValidation']();

    expect(directive['isValid']).toBeFalsy();
    expect(directive['message']).toBe(EXPECTED_MESSAGES.required);
    expect(directive['message']).not.toContain('${name}');
  });

  it('Should call checkEqualToValidation when component has equalTo attribute', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalTo);
    const checkEqualToValidationSpy = spyOn<any>(directive, 'checkEqualToValidation');

    fixture.detectChanges();
    directive['doValidation']();

    expect(checkEqualToValidationSpy).toHaveBeenCalled();
  });

  it('Should run validation when input equalTo is added', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalTo);

    fixture.detectChanges();
    directive['doValidation']();

    expect(directive['isValid']).toBeFalsy();
    expect(directive['message']).toBeDefined();
    expect(directive['message']).not.toContain('${field1}');
    expect(inputEl.nativeElement.classList).toContain('ng-equal-to');
  });

  it('Should not show validation message when equalTo is true', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalTo);
    component.toValidate = 'EQUAL';

    fixture.detectChanges();
    directive['doValidation']();

    expect(directive['isValid']).toBeTruthy();
    expect(directive['message']).not.toBeDefined();
    expect(inputEl.nativeElement.classList).not.toContain('ng-equal-to');
  });

  it('Should call validation method when component has its attribute', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalToElement);
    const checkEqualToElementValidationSpy = spyOn<any>(directive, 'checkEqualToElementValidation');

    fixture.detectChanges();
    directive['doValidation']();

    expect(checkEqualToElementValidationSpy).toHaveBeenCalled();
  });

  it('Should run validation when input equalToElement is added', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalToElement);

    fixture.detectChanges();
    directive['doValidation']();

    expect(directive['isValid']).toBeFalsy();
    expect(directive['message']).toBeDefined();
    expect(directive['message']).toBe('The field field2 is not equal to field1');
    expect(inputEl.nativeElement.classList).toContain('ng-equal-to');
  });

  it('Should not show validation message when equalToElement is true', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalToElement);
    component.toValidate = 'EQUAL';
    component.toValidate2 = 'EQUAL';

    fixture.detectChanges();
    directive['doValidation']();

    expect(directive['isValid']).toBeTruthy();
    expect(directive['message']).not.toBeDefined();
    expect(inputEl.nativeElement.classList).not.toContain('ng-equal-to');
  });

  it('Should show equalTo message when input is added', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalToMessage);

    fixture.detectChanges();
    directive['doValidation']();

    expect(directive['isValid']).toBeFalsy();
    expect(directive['message']).toBe(EXPECTED_MESSAGES.equalTo);
  });


});
