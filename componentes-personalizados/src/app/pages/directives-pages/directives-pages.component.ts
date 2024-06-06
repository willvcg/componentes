import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CustomHighlightDirective } from '../../directives/custom-highlight.directive';
import { DebounceInputDirective } from '../../directives/debounce-input.directive';
import { DoubleClickDirective } from '../../directives/double-click.directive';
import { HighlightDirective } from '../../directives/highlight.directive';
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
    DebounceInputDirective,
    HighlightDirective,
    CustomHighlightDirective,
    DoubleClickDirective,
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
    'Prueba de underline directive sin underline',
  );
  //#endregion

  //#region DebounceInput Directive
  searchTerm: string = '';
  searchTermDebounced: string = '';

  onSearch(term: string) {
    this.searchTermDebounced = term;
  }
  //#endregion

  //#region DoubleClickDirective
  singleHandler(e: MouseEvent) {
    console.log('Single click');
  }

  doubleHandler(e: MouseEvent) {
    console.log('Double click');
  }
}
