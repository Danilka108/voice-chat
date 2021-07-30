import {
  animate,
  AnimationMetadataType,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations'

const CHANGE_STEP_ANIM_DURATION_MS = 200

export const changeStepAnimation = () =>
  trigger('changeStepAnimation', [
    state(
      'next',
      style({
        transform: 'translate(50%, -50%)',
        opacity: '0%',
      })
    ),
    state(
      'current',
      style({
        transform: 'translate(-50%, -50%)',
        opacity: '100%',
        display: 'flex',
      })
    ),
    state(
      'prev',
      style({
        transform: 'translate(-150%, -50%)',
        opacity: '0%',
      })
    ),
    transition(
      'current => next',
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
      'next => current',
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
      'current => prev',
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
      'prev => current',
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
