import { Directive, HostBinding, Input } from '@angular/core'

@Directive({
  selector: 'p[vcAuthCaption]',
})
export class AuthCaptionDirective {
  @HostBinding('style.textAlign') @Input() textAlign: 'center' | 'left' | 'right' = 'left'
  @HostBinding('class.mat-caption') matCaption = true
  @HostBinding('style') styles = {
    margin: '0',
    marginBottom: '0.8rem',
    userSelect: 'none',
  }
}
