import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ErrorMessagesComponent } from '../../componentes/error-messages/error-message.component';

@Component({
  selector: 'app-form-page',
  standalone: true,
  templateUrl: './form-page.component.html',
  styleUrl: './form-page.component.css',
  imports: [ErrorMessagesComponent, FormsModule, ReactiveFormsModule],
})
export class FormPageComponent {
  userForm!: FormGroup;
  fb: FormBuilder = inject(FormBuilder);

  constructor() {
    this.userForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(16),
        ],
      ],
    });
  }
}
