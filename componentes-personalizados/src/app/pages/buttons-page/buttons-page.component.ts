import { Component, signal } from '@angular/core';
import { ButtonComponent } from '../../componentes/button/button.component';
import { TooltipDirective } from '../../directives/tooltip.directive';

@Component({
  selector: 'app-buttons-page',
  standalone: true,
  templateUrl: './buttons-page.component.html',
  styleUrl: './buttons-page.component.css',
  imports: [ButtonComponent, TooltipDirective],
})
export class ButtonsPageComponent {
  //#region Button
  title = signal<string>('Create');
  class = signal<string>('');
  text = signal<string>('Button');
  //#endregion

  protected clickButton() {
    this.text.set('Clicked');
  }
}
