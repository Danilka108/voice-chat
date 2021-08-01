import { Directive, HostBinding, Input } from '@angular/core'

@Directive({
  selector: 'p[vcAuthText]',
})
export class AuthTextDirective {
  @HostBinding('style.textAlign') @Input() textAlign: 'center' | 'left' | 'right' = 'left'
  @HostBinding('style') styles = {
    margin: '0',
    marginBottom: '0.8rem',
  }
  @HostBinding('class.mat-body') matBody = true
}
