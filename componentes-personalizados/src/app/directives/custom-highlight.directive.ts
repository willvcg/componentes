import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
} from '@angular/core';

@Directive({
  selector: '[appCustomHighlight]',
  standalone: true,
})
export class CustomHighlightDirective {
  private element: ElementRef<HTMLParagraphElement> = inject(ElementRef);

  highlightColor = input<string>('yellow');

  @HostListener('click') onClick() {
    this.element.nativeElement.style.backgroundColor = this.highlightColor();
  }
}
