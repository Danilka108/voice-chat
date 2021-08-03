import { Directive, HostBinding, Input } from '@angular/core'

@Directive({
  selector: 'h2[vcAuthHeader]',
})
export class AuthHeaderDirective {
  @HostBinding('style.textAlign') @Input() textAlign: 'left' | 'center' | 'right' = 'left'

  @HostBinding('style') styles = {
    margin: '0',
    width: '100%',
    marginTop: '0.8rem',
    userSelect: 'none',
  }
  @HostBinding('class.mat-h2') matH2 = true
}
