import { NgModule } from '@angular/core';
import { MessageService } from 'primeng/components/common/messageservice';

import { FormValidateDirective, FormValidationDirective } from './form-validation.directives';

@NgModule({
  declarations: [ FormValidateDirective, FormValidationDirective ],
  imports: [],
  exports: [ FormValidateDirective, FormValidationDirective ],
  providers: [ MessageService ]
})
export class FormValidationModule { }
