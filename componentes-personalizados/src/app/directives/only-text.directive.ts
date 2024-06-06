import {
  Directive,
  ElementRef,
  Host,
  HostListener,
  inject,
} from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[appOnlyText]',
  standalone: true,
})
export class OnlyTextDirective {
  element: ElementRef<HTMLInputElement> = inject(ElementRef);
  ngControl = inject(NgControl, { optional: true });

  @HostListener('input') onInput(): void {
    const value = this.element.nativeElement.value;
    const regex = /^[a-zA-Z\s]*$/;

    if (!regex.test(value)) {
      this.setValue(value);
    }
  }

  private setValue(value: string): void {
    const cleanValue = value.replace(/[^a-zA-Z\s]/g, '');

    if (this.ngControl) {
      this.ngControl.control!.setValue(cleanValue);
    } else {
      this.element.nativeElement.value = cleanValue;
    }
  }

  // Se puede acceder al value directamente desde el target
  // @HostListener('input', ['$event']) onInput(event: Event): void {
  //   const value = (event.target as HTMLInputElement).value;
  //   const regex = /^[a-zA-Z\s]*$/;

  //   if(!regex.test(value)) {
  //     this.setValue(value);
  //   }
  // }
}
