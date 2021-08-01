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

const CHANGE_STEP_ANIM_DURATION_MS = 200

export const changeStepAnimation = () =>
  trigger('changeStepAnimation', [
    state(
      ChangeStepAnimStates.Next,
      style({
        transform: 'translate(50%, -50%)',
        opacity: '0%',
      })
    ),
    state(
      ChangeStepAnimStates.Current,
      style({
        transform: 'translate(-50%, -50%)',
        opacity: '100%',
        display: 'flex',
      })
    ),
    state(
      ChangeStepAnimStates.Prev,
      style({
        transform: 'translate(-150%, -50%)',
        opacity: '0%',
      })
    ),
    transition(
      `${ChangeStepAnimStates.Current} => ${ChangeStepAnimStates.Next}`,
      animate(`${CHANGE_STEP_ANIM_DURATION_MS}ms`, {
        type: AnimationMetadataType.Keyframes,
        steps: [
          {
            type: AnimationMetadataType.Style,
            offset: 0,
            styles: {
              transform: 'translate(-50%, -50%)',
              opacity: '100%',
              display: 'flex',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 0.5,
            styles: {
              transform: 'translate(0, -50%)',
              opacity: '0%',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 1,
            styles: {
              transform: 'translate(50%, -50%)',
              opacity: '0%',
            },
          },
        ],
      })
    ),
    transition(
      `${ChangeStepAnimStates.Next} => ${ChangeStepAnimStates.Current}`,
      animate(`${CHANGE_STEP_ANIM_DURATION_MS}ms`, {
        type: AnimationMetadataType.Keyframes,
        steps: [
          {
            type: AnimationMetadataType.Style,
            offset: 0,
            styles: {
              transform: 'translate(50%, -50%)',
              opacity: '0%',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 0.5,
            styles: {
              transform: 'translate(0, -50%)',
              opacity: '0%',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 1,
            styles: {
              transform: 'translate(-50%, -50%)',
              opacity: '100%',
              display: 'flex',
            },
          },
        ],
      })
    ),
    transition(
      `${ChangeStepAnimStates.Current} => ${ChangeStepAnimStates.Prev}`,
      animate(`${CHANGE_STEP_ANIM_DURATION_MS}ms`, {
        type: AnimationMetadataType.Keyframes,
        steps: [
          {
            type: AnimationMetadataType.Style,
            offset: 0,
            styles: {
              transform: 'translate(-50%, -50%)',
              opacity: '100%',
              display: 'flex',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 0.5,
            styles: {
              transform: 'translate(-100%, -50%)',
              opacity: '0%',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 1,
            styles: {
              transform: 'translate(-150%, -50%)',
              opacity: '0%',
            },
          },
        ],
      })
    ),
    transition(
      `${ChangeStepAnimStates.Prev} => ${ChangeStepAnimStates.Current}`,
      animate(CHANGE_STEP_ANIM_DURATION_MS, {
        type: AnimationMetadataType.Keyframes,
        steps: [
          {
            type: AnimationMetadataType.Style,
            offset: 0,
            styles: {
              transform: 'translate(-150%, -50%)',
              opacity: '0%',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 0.5,
            styles: {
              transform: 'translate(-100%, -50%)',
              opacity: '0%',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 1,
            styles: {
              transform: 'translate(-50%, -50%)',
              opacity: '100%',
              display: 'flex',
            },
          },
        ],
      })
    ),
  ])
