export const VALIDATION_MESSAGES: any = {
  ngModelRequired: 'You need to add [(ngModel)] into the element',
  EN: {
    requiredMessage: 'The field \'${name}\' is required'
  },
  ES: {
    requiredMessage: 'El campo \'${name}\' es requerido'
  },

  /**
   * @since v0.0.0
   * @deprecated
   * Will be deleted in version 1.0.0. Use location section instead: VALIDATION_MESSAGES.EN.requiredMessage
   */
  requiredMessage: 'The field ${name} is required',

  /**
   * @since v0.0.0
   * @deprecated
   * Will be deleted in version 1.0.0. Use location section instead: VALIDATION_MESSAGES.EN.equalToSimpleMessage
   */
  equalToSimpleMessage: 'The field ${field1} is not equal',

  /**
   * @since v0.0.0
   * @deprecated
   * Will be deleted in version 1.0.0. Use location section instead: VALIDATION_MESSAGES.EN.equalToComplexMessage
   */
  equalToComplexMessage: 'The field ${field1} is not equal to ${field2}'

};
