import {
  AfterViewInit,
  DestroyRef,
  Directive,
  ElementRef,
  inject,
  input,
  output,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, fromEvent, tap } from 'rxjs';

@Directive({
  selector: '[appDebounceInput]',
  standalone: true,
})
export class DebounceInputDirective implements AfterViewInit {
  private readonly destroyRef = inject(DestroyRef);
  private elementRef: ElementRef<HTMLInputElement> = inject(ElementRef);

  debounceTime = input<number>(1000);
  search = output<string>();

  ngAfterViewInit(): void {
    fromEvent(this.elementRef.nativeElement, 'keyup')
      .pipe(
        debounceTime(this.debounceTime()),
        takeUntilDestroyed(this.destroyRef),
        tap(() => this.search.emit(this.elementRef.nativeElement.value)),
      )
      .subscribe();
  }
}
