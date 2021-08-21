import {
  trigger,
  transition,
  animate,
  state,
  style,
  AnimationMetadataType,
} from '@angular/animations'

export enum HideNextBtnAnimStates {
  Default = 'DEFAULT',
  Hiden = 'HIDEN',
}

export const hideNextBtnAnim = () =>
  trigger('hideNextBtnAnimation', [
    state(
      HideNextBtnAnimStates.Default,
      style({
        opacity: 1,
        transform: 'translateX(0)',
      })
    ),
    state(
      HideNextBtnAnimStates.Hiden,
      style({
        opacity: 0,
        transform: 'translateX(-100%)',
      })
    ),
    transition(
      `${HideNextBtnAnimStates.Default} => ${HideNextBtnAnimStates.Hiden}`,
      animate('200ms', {
        type: AnimationMetadataType.Keyframes,
        steps: [
          {
            type: AnimationMetadataType.Style,
            offset: 0,
            styles: {
              opacity: 1,
              transform: 'translateX(0)',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 0.5,
            styles: {
              opacity: 0,
              transform: 'translateX(-50%)',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 1,
            styles: {
              opacity: 0,
              transform: 'translateX(-100%)',
            },
          },
        ],
      })
    ),
    transition(
      `${HideNextBtnAnimStates.Hiden} => ${HideNextBtnAnimStates.Default}`,
      animate('200ms', {
        type: AnimationMetadataType.Keyframes,
        steps: [
          {
            type: AnimationMetadataType.Style,
            offset: 0,
            styles: {
              opacity: 0,
              transform: 'translateX(-100%)',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 0.5,
            styles: {
              opacity: 0,
              transform: 'translateX(-50%)',
            },
          },
          {
            type: AnimationMetadataType.Style,
            offset: 1,
            styles: {
              opacity: 1,
              transform: 'translateX(0)',
            },
          },
        ],
      })
    ),
  ])
