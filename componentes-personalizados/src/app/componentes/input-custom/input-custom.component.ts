import { Component, input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-input-custom',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './input-custom.component.html',
  styleUrl: './input-custom.component.css',
})
export class InputCustomComponent {
  placeholder = input<string>('');
  type = input<'text' | 'password' | 'email' | 'number'>('text');
  control = input<FormControl>(new FormControl());
}
