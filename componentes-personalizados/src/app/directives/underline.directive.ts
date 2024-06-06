import { Directive, ElementRef, Renderer2, inject } from '@angular/core';

@Directive({
  selector: '[appUnderline]',
  standalone: true,
})
export class UnderlineDirective {
  element: ElementRef<HTMLParagraphElement> = inject(ElementRef);
  renderer = inject(Renderer2);

  constructor() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'text-decoration',
      'underline',
    );
  }
}
