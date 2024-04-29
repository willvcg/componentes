import { NgClass } from '@angular/common';
import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [NgClass],
  templateUrl: './accordion-item.component.html',
  styleUrl: './accordion-item.component.css',
})
export class AccordionItemComponent {
  isOpen = signal<boolean>(false);
  toggle() {
    this.isOpen.set(!this.isOpen());
  }
}
