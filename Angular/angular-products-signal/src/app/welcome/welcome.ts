import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { GoogleLogin } from '../google-login/google-login';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FbLogin } from '../facebook-login/fb-login';
import { faFacebook } from '@fortawesome/free-brands-svg-icons';
import { OlMap } from '../ol-maps/ol-map';
import { OlMarker } from '../ol-maps/ol-marker';
import { SearchResult } from '../ol-maps/search-result';
import { GaAutocomplete } from '../ol-maps/ga-autocomplete';

@Component({
  selector: 'welcome',
  imports: [RouterLink, GoogleLogin, FbLogin, FontAwesomeModule, OlMap, OlMarker, GaAutocomplete],
  templateUrl: './welcome.html',
  styleUrl: './welcome.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Welcome {
  changePlace(result: SearchResult) {
    this.coordinates.set(result.coordinates);
    console.log(result.address); // Habría que guardarlo
  }
  coordinates = signal<[number, number]>([-0.5, 38.5]); // longitud y latitud
  loggedGoogle(resp: google.accounts.id.CredentialResponse) {
    // Envia esto tu API
    console.log(resp.credential);
  }
  iconFacebook = faFacebook;
  //...
  loggedFacebook(resp: fb.StatusResponse) {
    // Envía esto a tu API
    console.log(resp.authResponse.accessToken);
  }

  showError(error: string) {
    console.error(error);
  }
}
