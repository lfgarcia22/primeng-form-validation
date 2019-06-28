import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';
import * as Directives from './form-validation.directives';

@NgModule({
  declarations: [
    Directives.EqualToElementDirective,
    Directives.EqualToDirective,
    Directives.FormValidateDirective,
    Directives.FormValidationDirective
  ],
  imports: [],
  exports: [
    Directives.EqualToElementDirective,
    Directives.EqualToDirective,
    Directives.FormValidateDirective,
    Directives.FormValidationDirective
  ],
  providers: [MessageService]
})
export class FormValidationModule { }
