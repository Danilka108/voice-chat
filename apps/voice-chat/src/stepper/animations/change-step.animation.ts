import {
  animate,
  AnimationMetadataType,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'

export enum ChangeStepAnimStates {
  Next = 'CHANGE_STEP_ANIM_STATE_NEXT',
  Prev = 'CHANGE_STEP_ANIM_STATE_PREV',
  Current = 'CHANGE_STEP_ANIM_STATE_CURRENT',
}

const CHANGE_STEP_ANIM_DURATION = '200ms'

export const changeStepAnimation = () =>
  trigger('changeStepAnimation', [
    state(
      ChangeStepAnimStates.Next,
      style({
        opacity: '0%',
        left: '100%',
      })
    ),
    state(
      ChangeStepAnimStates.Current,
      style({
        opacity: '100%',
        left: '0',
      })
    ),
    state(
      ChangeStepAnimStates.Prev,
      style({
        opacity: '0%',
        left: '-100%',
      })
    ),
    transition(
      `${ChangeStepAnimStates.Current} => ${ChangeStepAnimStates.Next}`,
      animate(`${CHANGE_STEP_ANIM_DURATION}`, {
        type: AnimationMetadataType.Keyframes,
        steps: [
          {
            type: AnimationMetadataType.Style,
            offset: 0,
            styles: {
              opacity: '100%',
              left: '0',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 0.5,
            styles: {
              opacity: '0%',
              left: '50%',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 1,
            styles: {
              opacity: '0%',
              left: '100%',
            },
          },
        ],
      })
    ),
    transition(
      `${ChangeStepAnimStates.Next} => ${ChangeStepAnimStates.Current}`,
      animate(`${CHANGE_STEP_ANIM_DURATION}`, {
        type: AnimationMetadataType.Keyframes,
        steps: [
          {
            type: AnimationMetadataType.Style,
            offset: 0,
            styles: {
              opacity: '0%',
              left: '100%',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 0.5,
            styles: {
              opacity: '0%',
              left: '50%',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 1,
            styles: {
              opacity: '100%',
              left: '0',
            },
          },
        ],
      })
    ),
    transition(
      `${ChangeStepAnimStates.Current} => ${ChangeStepAnimStates.Prev}`,
      animate(`${CHANGE_STEP_ANIM_DURATION}`, {
        type: AnimationMetadataType.Keyframes,
        steps: [
          {
            type: AnimationMetadataType.Style,
            offset: 0,
            styles: {
              opacity: '100%',
              left: '0',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 0.5,
            styles: {
              opacity: '0%',
              left: '-50%',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 1,
            styles: {
              opacity: '0%',
              left: '-100%',
            },
          },
        ],
      })
    ),
    transition(
      `${ChangeStepAnimStates.Prev} => ${ChangeStepAnimStates.Current}`,
      animate(`${CHANGE_STEP_ANIM_DURATION}`, {
        type: AnimationMetadataType.Keyframes,
        steps: [
          {
            type: AnimationMetadataType.Style,
            offset: 0,
            styles: {
              opacity: '0%',
              left: '-100%',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 0.5,
            styles: {
              opacity: '0%',
              left: '-50%',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 1,
            styles: {
              opacity: '100%',
              left: '0',
            },
          },
        ],
      })
    ),
  ])
