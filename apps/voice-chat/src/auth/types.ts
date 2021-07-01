import { AuthStepStates } from './enums'

export type AuthWelcomeStepState = {
  state: AuthStepStates.Welcome
  nextState: AuthStepStates.Name | AuthStepStates.Tel
}

export type AuthNameStepState = {
  state: AuthStepStates.Name
  nextState: AuthStepStates.Tel
}

export type AuthTelStepState = {
  state: AuthStepStates.Tel
  nextState: AuthStepStates.Code
}

export type AuthStepState = AuthWelcomeStepState | AuthNameStepState | AuthTelStepState
