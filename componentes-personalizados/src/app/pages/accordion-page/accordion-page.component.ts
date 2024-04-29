import { Component } from '@angular/core';
import { AccordionItemComponent } from '../../componentes/accordion-item/accordion-item.component';
import { AccordionComponent } from '../../componentes/accordion/accordion.component';

@Component({
  selector: 'app-accordion-page',
  standalone: true,
  templateUrl: './accordion-page.component.html',
  styleUrl: './accordion-page.component.css',
  imports: [AccordionComponent, AccordionItemComponent],
})
export class AccordionPageComponent {}
