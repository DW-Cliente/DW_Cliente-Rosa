import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { PreloadAllModules, provideRouter, withComponentInputBinding, withPreloading } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { baseUrlInterceptor } from './shared/interceptors/base-url-interceptor';
import { authInterceptor } from './shared/interceptors/auth-interceptor';
import { provideSignalFormsConfig, SignalFormsConfig } from '@angular/forms/signals';
import { provideGoogleId } from './auth/google-login/google-login.config';
import { provideFacebookId } from './auth/facebook-login/facebook-login.config';
export const NG_STATUS_CLASSES: SignalFormsConfig['classes'] = {
  'ng-touched': ({state}) => state().touched(),
  'ng-untouched': ({state}) => !state().touched(),
  'ng-dirty': ({state}) => state().dirty(),
  'ng-pristine': ({state}) => !state().dirty(),
  'ng-valid': ({state}) => state().valid(),
  'ng-invalid': ({state}) => state().invalid(),
  'ng-pending': ({state}) => state().pending(),
};
export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes, withComponentInputBinding(), withPreloading(PreloadAllModules)),
    provideHttpClient(withInterceptors([baseUrlInterceptor,authInterceptor])),
    provideSignalFormsConfig({
      classes: {
        ...NG_STATUS_CLASSES,
        'is-valid': ({state}) => state().touched() && state().valid(),
        'is-invalid': ({state}) => state().touched() && state().invalid()
      }
    }),
    provideGoogleId('889410115200-1a2pni66elk4qfjit3l2od1n5lhndlld.apps.googleusercontent.com'),
    provideFacebookId('2951779481699999', 'v24.0')
  ]
};

