import { NgModule } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MessageService } from 'primeng/components/common/messageservice';

import { FormValidateDirective, FormValidationDirective } from './form-validation.directives';

@NgModule({
  declarations: [ FormValidateDirective, FormValidationDirective ],
  imports: [],
  exports: [ FormValidateDirective, FormValidationDirective ],
  providers: [ MessageService ]
})
export class FormValidationModule { }
