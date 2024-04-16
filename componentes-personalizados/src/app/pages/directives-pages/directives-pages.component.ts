import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NumbersOnlyDirective } from '../../directives/numbers-only.directive';
import { OnlyTextDirective } from '../../directives/only-text.directive';
import { UnderlineDirective } from '../../directives/underline.directive';

@Component({
  selector: 'app-directives-pages',
  standalone: true,
  imports: [
    FormsModule,
    OnlyTextDirective,
    NumbersOnlyDirective,
    UnderlineDirective,
  ],
  templateUrl: './directives-pages.component.html',
  styleUrl: './directives-pages.component.css',
})
export class DirectivesPagesComponent {
  //#region OnlyText Directive
  text = '';
  //#endregion

  //#region NumbersOnly Directive
  inputNumber = '';
  //#endregion

  //#region NumbersOnly Directive
  textDirective = signal<string>('Prueba de underline directive');
  textWithOutDirective = signal<string>(
    'Prueba de underline directive sin underline'
  );
  //#endregion
}
