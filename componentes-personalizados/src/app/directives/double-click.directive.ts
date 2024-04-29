import { Directive, HostListener, output, signal } from '@angular/core';

@Directive({
  selector: '[appDoubleClick]',
  standalone: true,
})
export class DoubleClickDirective {
  singleClick = output<MouseEvent>();
  doubleClick = output<MouseEvent>();

  protected timer = signal<ReturnType<typeof setTimeout> | undefined | number>(
    undefined
  );
  protected stopClick = signal(false);

  @HostListener('click', ['$event']) onClick(e: MouseEvent) {
    this.timer.set(0);
    this.stopClick.set(false);
    const delay = 200;

    this.timer.set(
      setTimeout(() => {
        if (!this.stopClick()) {
          this.singleClick.emit(e);
        }
      }, delay)
    );
  }

  @HostListener('dblclick', ['$event']) onDoubleClick(e: MouseEvent) {
    this.stopClick.set(true);
    clearTimeout(this.timer());
    this.doubleClick.emit(e);
  }
}
