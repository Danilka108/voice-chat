import { animate, state, style, transition, trigger } from '@angular/animations'

export const changeStepAnimation = (durationMs: number) =>
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
    transition('current <=> next', animate(`${durationMs}ms`)),
    transition('prev <=> current', animate(`${durationMs}ms`)),
  ])
