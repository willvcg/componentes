import { Directive, ElementRef, Renderer2, inject, input } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  private element: ElementRef<HTMLParagraphElement> = inject(ElementRef);
  private renderer = inject(Renderer2);

  highlightColor = input<string>('yellow');

  ngOnInit() {
    this.renderer.setStyle(
      this.element.nativeElement,
      'background-color',
      this.highlightColor()
    );
  }
}
