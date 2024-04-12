import { NgClass } from '@angular/common';
import { Component, ElementRef, inject, input, output } from '@angular/core';
import { ButtonComponent } from "../button/button.component";

@Component({
    selector: 'app-modal',
    standalone: true,
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.css',
    imports: [NgClass, ButtonComponent]
})
export class ModalComponent {
  private elementRef = inject(ElementRef)
  
  showModal = input.required<boolean>();
  title = input.required<string>();
  okText = input<string>();
  cancelText = input<string>();
  okClass = input<string>();
  cancelClass = input<string>();
  okDisabled = input<boolean>();
  closeClickOutside = input<boolean>();
  onOk = output();
  onClose = output();


  closeOnBackdrop(event: MouseEvent) {
    if (!this.closeClickOutside()) {
      return;
    }
    const modalContent = this.elementRef.nativeElement.querySelector('.modal-content');
    if (!modalContent.contains(event.target as Node)) {
      this.onClose.emit();
    }
  }

  okModal() {
    this.onOk.emit()
  }

  cancelModal() {
    this.onClose.emit();
  }
}
