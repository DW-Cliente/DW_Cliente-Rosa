import { Component, signal } from '@angular/core';
import { SetColorDirective } from './directives/set-color-directive';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [SetColorDirective, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ejemplo-directivs');
  color = signal('yellow');
}
