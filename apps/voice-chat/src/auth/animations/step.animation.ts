import { animate, state, style, transition, trigger } from '@angular/animations'

export const stepAnimation = (timingMs: number) =>
  trigger('stepAnimation', [
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
    transition('current <=> next', animate(`${timingMs}ms`)),
    transition('prev <=> current', animate(`${timingMs}ms`)),
  ])
