import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { FormControl, FormsModule, NgModel } from '@angular/forms';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormValidationDirective } from './validation.directive';
import { MessageService } from 'primeng/components/common/messageservice';
import { EXPECTED_MESSAGES, INPUT_EXAMPLES, MockMessageService, TestValidationComponent } from './helpers.spec';

describe('FormValidationDirective:', () => {

  let fixture: ComponentFixture<TestValidationComponent>;
  let component: TestValidationComponent;
  let inputEl: DebugElement;
  let directive: FormValidationDirective;

  const expectedRequiredValidation = { required: false };

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

    fixture.whenStable().then(() => {
      expect(checkRequiredValidationSpy).toHaveBeenCalled();
      expect(directive.ngModel).toBe('NOT NULL');
      expect(directive['isValid']).toBeTruthy();
      expect(directive['message']).not.toBeDefined();
      expect(directive['validation']).not.toBeDefined();
    });
  });

  it('Should run invalid required validation when component is required', async () => {
    setGlobalVariables(INPUT_EXAMPLES.required);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(directive.ngModel).not.toBeDefined();
      expect(directive['isValid']).toBeFalsy();
      expect(directive['message']).toBeDefined();
      expect(directive['message']).not.toContain('${name}');
      expect(directive['validation'].required).toBeFalsy();
    });
  });

  it('Should show required message when attribute is added', async () => {
    setGlobalVariables(INPUT_EXAMPLES.requiredWithMessage);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(directive['isValid']).toBeFalsy();
      expect(directive['message']).toBe(EXPECTED_MESSAGES.required);
      expect(directive['message']).not.toContain('${name}');
    });
  });

  it('Should show required message when input is added', async () => {
    setGlobalVariables(INPUT_EXAMPLES.requiredVariableMessage);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(directive['isValid']).toBeFalsy();
      expect(directive['message']).toBe(EXPECTED_MESSAGES.required);
      expect(directive['message']).not.toContain('${name}');
    });
  });

  it('Should call checkEqualToValidation when component has equalTo attribute', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalTo);
    const checkEqualToValidationSpy = spyOn<any>(directive, 'checkEqualToValidation');

    fixture.detectChanges();

    expect(checkEqualToValidationSpy).toHaveBeenCalled();
  });

  it('Should run validation when input equalTo is added', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalTo);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(directive['isValid']).toBeFalsy();
      expect(directive['message']).toBeDefined();
      expect(directive['message']).not.toContain('${field1}');
      expect(directive['validation'].equalTo).toBeFalsy();
    });
  });

  it('Should not show validation message when equalTo is true', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalTo);

    component.toValidate = 'EQUAL';
    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(directive['isValid']).toBeTruthy();
      expect(directive['message']).not.toBeDefined();
      expect(directive['validation']).not.toBeDefined();
    });
  });

  it('Should call validation method when component has its attribute', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalToElement);
    const checkEqualToElementValidationSpy = spyOn<any>(directive, 'checkEqualToElementValidation');

    fixture.detectChanges();

    expect(checkEqualToElementValidationSpy).toHaveBeenCalled();
  });

  it('Should run validation when input equalToElement is added', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalToElement);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(directive['isValid']).toBeFalsy();
      expect(directive['message']).toBeDefined();
      expect(directive['message']).toBe('The field field2 is not equal to field1');
      expect(directive['validation'].equalToElement).toBeFalsy();
    });
  });

  it('Should not show validation message when equalToElement is true', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalToElement);
    component.toValidate = 'EQUAL';
    component.toValidate2 = 'EQUAL';

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(directive['isValid']).toBeTruthy();
      expect(directive['message']).not.toBeDefined();
      expect(directive['validation']).not.toBeDefined();
    });
  });

  it('Should show equalTo message when input is added', async () => {
    setGlobalVariables(INPUT_EXAMPLES.equalToMessage);

    fixture.detectChanges();

    fixture.whenStable().then(() => {
      expect(directive['isValid']).toBeFalsy();
      expect(directive['validation'].equalTo).toBeFalsy();
      expect(directive['message']).toBe(EXPECTED_MESSAGES.equalTo);
    });
  });

});
