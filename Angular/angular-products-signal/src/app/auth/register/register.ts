import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { email, form, FormField, minLength, required, validate } from '@angular/forms/signals';

@Component({
  selector: 'register',
  imports: [FormField],
  templateUrl: './register.html',
  styleUrl: './register.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Register {
  registerModel = signal({
    email: '',
    password: '',    
    password2: ''
  });

registerForm = form(this.registerModel, (schema) => {
    required(schema.email, {message: 'Email is required'});
    required(schema.password, {message: 'Password is required'});
    required(schema.password2, {message: 'Repeat password is required'});
    email(schema.email, {message: 'Email must have the right format'});
    minLength(schema.password, 4, {
      message: () =>
        `La longitud mínima de la contraseña son 4 caracteres`,
    });
    minLength(schema.password2, 4, {
      message: `La longitud mínima de la contraseña son 4 caracteres`
    });
    validate(schema.password2, ({value, valueOf}) => {
      const password1 = valueOf(schema.password);// Creamos dependencia con este valor
      if(value() !== password1) {
        return {
          kind: 'samePassword',
          message: 'Contraseañs are not equal'
        }
      }
      return null;
    })
  });

  registrar($event: SubmitEvent) {
    $event.preventDefault();
    console.log('Hago el registro aqui');
  }
}
