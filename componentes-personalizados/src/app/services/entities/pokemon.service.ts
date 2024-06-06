import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.development';
import { defaultTablePaginationParams } from '../../componentes/table/table.component';
import { PaginationParams } from '../../models/paginated';
import { PokemonList } from '../../models/pokemon';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root',
})
export class PokemonService extends CoreService {
  getPokemonsList(
    paginator: PaginationParams = defaultTablePaginationParams,
  ): Observable<PokemonList> {
    return this.http.get<PokemonList>(`${environment.apiUrlBase}pokemon`, {
      params: { ...paginator },
    });
  }
}
