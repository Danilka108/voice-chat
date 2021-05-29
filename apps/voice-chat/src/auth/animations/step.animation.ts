import { animate, state, style, transition, trigger } from '@angular/animations'

export const stepAnimation = (timingMs: number) =>
  trigger('stepAnimation', [
    state(
      'not-used',
      style({
        right: '-100%',
        opacity: '0%',
      })
    ),
    state(
      'selected',
      style({
        right: '0%',
        opacity: '100%',
      })
    ),
    state(
      'unselected',
      style({
        right: '100%',
        opacity: '0%',
      })
    ),
    transition('not-used => selected', animate(`${timingMs}ms`)),
    transition('selected => unselected', animate(`${timingMs}ms`)),
  ])
