import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  SelectComponent,
  Selected,
  Values,
} from '../../componentes/select/select.component';

@Component({
  selector: 'app-selects-page',
  standalone: true,
  templateUrl: './selects-page.component.html',
  styleUrl: './selects-page.component.css',
  imports: [SelectComponent, FormsModule, ReactiveFormsModule],
})
export class SelectsPageComponent {
  private formBuilder: FormBuilder = inject(FormBuilder);
  /** Array de los tipos de documentos */
  tipoDocumentos = signal<Values<string | number, string>>({
    '0': 'Selecciona un tipo de documento',
    NIF: 'NIF',
    NIE: 'NIE',
    CIF: 'CIF',
    PASAPORTE: 'PASAPORTE',
  });
  /** Documento seleccionado */
  documento = signal<Selected>('NIF');
  myForm: FormGroup = this.formBuilder.group({
    documento: ['', Validators.required],
  });

  /** Array de los tipos de plantas */
  tipoPlantas = signal<Values<string | number, string>>({
    '0': 'Selecciona un tipo de planta',
    INTERIOR: 'Interior',
    EXTERIOR: 'Exterior',
  });
  /** Planta seleccionada */
  planta = signal<Selected>('INTERIOR');
  plantaNgModel = signal<Selected | null>('INTERIOR');

  onSubmit() {
    if (this.myForm.valid) {
      const selectedDocumento = this.myForm.value.documento;
    }
  }

  protected selectedChange(event: Selected | undefined) {
    console.log('event', event);
  }
}
