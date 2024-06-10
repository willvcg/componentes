import { NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  title = input.required<string>();
  class = input<string>();
  type = input<string>('button');
  disabled = input<boolean>();
  onClick = output();

  click() {
    this.onClick.emit();
  }
}
