import { Directive, ElementRef, HostListener, inject } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appNumbersOnly]',
  standalone: true,
})
export class NumbersOnlyDirective {
  ngControl = inject(NgControl, { optional: true });

  element: ElementRef<HTMLInputElement> = inject(ElementRef);

  @HostListener('input', ['$event']) onChangeInput(): void {
    const value = this.element.nativeElement.value;
    const regex = /[^0-9]/g;

    if (regex.test(value)) {
      this.setValue(value);
    }
  }

  private setValue(value: string): void {
    const cleanValue = value.replace(/[^0-9]/g, '');

    if (this.ngControl) {
      this.ngControl.control!.setValue(cleanValue);
    } else {
      this.element.nativeElement.value = cleanValue;
    }
  }
}
