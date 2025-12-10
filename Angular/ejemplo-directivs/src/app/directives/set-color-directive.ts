import { Directive, effect, ElementRef, inject, input, signal } from '@angular/core';

@Directive({
  selector: '[setColorDirective]',
  host: {
    '[style.backgroundColor]': 'color()',
    '[style.color]': 'textColor()',
    '(click)': 'toggleTextColor()',
  },
})
export class SetColorDirective {
  color = input.required<string>({ alias: 'setColorDirective' });
  textColor = signal('black');

  toggleTextColor() {
    this.textColor.update((c) => (c === 'black' ? 'white' : 'black'));
  }
}
