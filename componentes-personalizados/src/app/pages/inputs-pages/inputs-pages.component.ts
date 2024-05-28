import { JsonPipe } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputCustomComponent } from '../../componentes/input-custom/input-custom.component';
import { InputComponent } from '../../componentes/input/input.component';

@Component({
  selector: 'app-inputs-pages',
  standalone: true,
  templateUrl: './inputs-pages.component.html',
  styleUrl: './inputs-pages.component.css',
  imports: [
    InputComponent,
    FormsModule,
    ReactiveFormsModule,
    JsonPipe,
    InputCustomComponent,
  ],
})
export class InputsPagesComponent {
  private fb = inject(FormBuilder);
  //#region Input Component
  inputNumber = signal<number>(12);
  inputString = signal<string>('');
  form: FormGroup = new FormGroup({
    inputText: new FormControl('test'),
  });
  //#endregion

  //#region Input Custom Component
  formCustom = this.fb.group({
    name: [''],
    email: [''],
    password: [''],
    number: [''],
  });

  ocultarNombre = signal<boolean>(false);

  onSubmit() {
    console.log(this.formCustom.value);
  }
}
