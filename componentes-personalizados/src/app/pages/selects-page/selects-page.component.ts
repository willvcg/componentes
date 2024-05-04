import { Component, inject } from '@angular/core';
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
  tipoDocumentos = {
    '0': 'Selecciona un tipo de documento',
    NIF: 'NIF',
    NIE: 'NIE',
    CIF: 'CIF',
    PASAPORTE: 'PASAPORTE',
  };
  /** Documento seleccionado */
  documento: Selected<typeof this.tipoDocumentos> = 'NIF';
  myForm: FormGroup = this.formBuilder.group({
    documento: ['', Validators.required],
  });

  /** Array de los tipos de plantas */
  tipoPlantas = {
    '0': 'Selecciona un tipo de planta',
    INTERIOR: 'Interior',
    EXTERIOR: 'Exterior',
  };
  /** Planta seleccionada */
  planta: Selected<typeof this.tipoPlantas> = 'INTERIOR';
  plantaNgModel?: string;

  onSubmit() {
    if (this.myForm.valid) {
      const selectedDocumento = this.myForm.value.documento;
    }
  }

  protected selectedChange(event: any) {
    console.log('event', event);
  }
}
