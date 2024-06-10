import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SpaceXLaunch } from '../../models/space-x';
import { CoreService } from '../core/core.service';

@Injectable({
  providedIn: 'root',
})
export class SpaceXService extends CoreService {
  private apiUrlAll = 'https://api.spacexdata.com/v5/launches';

  getLaunchs(): Observable<SpaceXLaunch[]> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return this.http.get<any>(this.apiUrlAll);
  }
}
