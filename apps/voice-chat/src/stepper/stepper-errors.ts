export const getStepperItemIsNotInStepperWrapperError = () => {
  return Error('Stepper-item must be in a stepper-wrapper')
}

export const getStepperFieldIsNotInStepperItemError = () => {
  return Error('Stepper-field must be in a stepper-item')
}

export const getFormGroupIsMissingInStepperWrapperFormGroupError = (formGroupName: string) => {
  return Error(`FormGroup ${formGroupName} is missing in stepper-wrapper FormGroup`)
}

export const getInputsIsMissingInStepperItemError = (...inputs: string[]) => {
  return Error(`In stepper item is missing inputs: ${inputs.join(' ,')}`)
}

export const getInputsIsMissingInStepperFieldError = (...inputs: string[]) => {
  return Error(`In stepper field is missing inputs: ${inputs.join(' ,')}`)
}

export const getInputsIsMissingInStepperWRapperError = (...inputs: string[]) => {
  return Error(`In stepper wrapper is missing inputs: ${inputs.join(' ,')}`)
}

export const getFormControlIsMissingInStepperItemFormGroupError = (
  formControlName: string
) => {
  return Error(`FormControl ${formControlName} is missing in stepper-item FormGroup`)
}
