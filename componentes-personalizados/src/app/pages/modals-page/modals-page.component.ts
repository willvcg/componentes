import { Component, signal } from '@angular/core';
import { ModalComponent } from '../../componentes/modal/modal.component';

@Component({
  selector: 'app-modals-page',
  standalone: true,
  templateUrl: './modals-page.component.html',
  styleUrl: './modals-page.component.css',
  imports: [ModalComponent],
})
export class ModalsPageComponent {
  //#region Modal
  showModal = signal(false);
  //#endregion

  protected onOkModal() {
    this.showModal.set(false);
  }

  protected onCancelModal() {
    this.showModal.set(false);
  }
}
