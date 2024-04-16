import { JsonPipe } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputComponent } from '../../componentes/input/input.component';

@Component({
  selector: 'app-inputs-pages',
  standalone: true,
  templateUrl: './inputs-pages.component.html',
  styleUrl: './inputs-pages.component.css',
  imports: [InputComponent, FormsModule, ReactiveFormsModule, JsonPipe],
})
export class InputsPagesComponent {
  //#region Input Component
  inputText = '';
  form: FormGroup = new FormGroup({
    inputText: new FormControl('test'),
  });
  //#endregion
}
