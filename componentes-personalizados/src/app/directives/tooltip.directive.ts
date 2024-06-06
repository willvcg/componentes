import { DOCUMENT } from '@angular/common';
import {
  Directive,
  ElementRef,
  HostListener,
  inject,
  input,
  signal,
} from '@angular/core';

type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  private elementRef: ElementRef<HTMLSpanElement> = inject(ElementRef);
  private document = inject(DOCUMENT);

  tooltipTitle = input.required<string>();
  placement = input<TooltipPlacement>('right');
  delay = input<number>(100);
  offset = signal<number>(10);
  tooltip?: HTMLSpanElement;

  @HostListener('mouseenter') onMouseEnter() {
    if (!this.tooltip) {
      this.show();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.hide();
    }
  }

  show() {
    this.create();
    this.setPosition();
    this.tooltip?.classList.add('ng-tooltip-show');
  }

  hide() {
    window.setTimeout(() => {
      this.tooltip?.classList.remove('ng-tooltip-show');
      this.tooltip?.remove();
      this.tooltip = undefined;
    }, this.delay());
  }

  create() {
    this.tooltip = this.document.createElement('span');
    this.tooltip.classList.add('ng-tooltip');
    this.tooltip.textContent = this.tooltipTitle();
    this.document.body.appendChild(this.tooltip);
  }

  setPosition() {
    const elemRect = this.elementRef.nativeElement.getBoundingClientRect();
    const tooltipRect = this.tooltip?.getBoundingClientRect();
    if (!tooltipRect) return;

    let left, top;

    switch (this.placement()) {
      case 'top':
        left = elemRect.left + (elemRect.width - tooltipRect.width) / 2;
        top = elemRect.top - tooltipRect.height - this.offset();
        break;
      case 'bottom':
        left = elemRect.left + (elemRect.width - tooltipRect.width) / 2;
        top = elemRect.bottom + this.offset();
        break;
      case 'left':
        left = elemRect.left - tooltipRect.width - this.offset();
        top = elemRect.top + (elemRect.height - tooltipRect.height) / 2;
        break;
      case 'right':
        left = elemRect.right + this.offset();
        top = elemRect.top + (elemRect.height - tooltipRect.height) / 2;
        break;
      default:
        throw new Error('Invalid placement value ' + this.placement());
    }

    if (this.tooltip) {
      this.tooltip.style.left = left + 'px';
      this.tooltip.style.top = top + 'px';
    }
  }
}
