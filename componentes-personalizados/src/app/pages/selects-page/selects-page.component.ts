import { Component } from '@angular/core';
import {
  SelectComponent,
  Selected,
} from '../../componentes/select/select.component';

@Component({
  selector: 'app-selects-page',
  standalone: true,
  templateUrl: './selects-page.component.html',
  styleUrl: './selects-page.component.css',
  imports: [SelectComponent],
})
export class SelectsPageComponent {
  /** Array de los tipos de documentos */
  tipoDocumentos = {
    '0': 'Selecciona un tipo de documento',
    NIF: 'NIF',
    NIE: 'NIE',
    CIF: 'CIF',
    PASAPORTE: 'PASAPORTE',
  };
  /** Documento seleccionado */
  documento: Selected<typeof this.tipoDocumentos> = 'NIF';

  protected selectedChange(event: any) {
    console.log('event', event);
  }
}
