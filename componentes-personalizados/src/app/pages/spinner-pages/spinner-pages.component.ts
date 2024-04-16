import { Component, inject } from '@angular/core';
import { SpinnerComponent } from '../../componentes/spinner/spinner.component';
import { SpinnerService } from '../../services/spinner.service';

@Component({
  selector: 'app-spinner-pages',
  standalone: true,
  templateUrl: './spinner-pages.component.html',
  styleUrl: './spinner-pages.component.css',
  imports: [SpinnerComponent],
})
export class SpinnerPagesComponent {
  private spinnerService = inject(SpinnerService);

  protected onSpinner() {
    this.spinnerService.show();
  }
}
