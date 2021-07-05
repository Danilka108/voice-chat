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
      })
    ),
    state(
      'prev',
      style({
        transform: 'translate(-100%, -50%)',
        opacity: '0%',
      })
    ),
    transition('current <=> next', animate(`${timingMs}ms`)),
    transition('prev <=> current', animate(`${timingMs}ms`)),
    // transition('prev <=> next', animate(`${timingMs}ms`)),
  ])
