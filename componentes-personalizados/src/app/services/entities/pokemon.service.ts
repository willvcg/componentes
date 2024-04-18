import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { PokemonList } from '../../models/pokemon';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService extends CoreService {
  getPokemonsList(): Observable<PokemonList> {
    return this.http.get<PokemonList>(
      `${environment.apiUrlBase}pokemon?limit=10&offset=0`
    );
  }
}
