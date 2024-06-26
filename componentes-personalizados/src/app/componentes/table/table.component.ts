import { Component, computed, input, output, signal } from '@angular/core';
import { SafeValue } from '@angular/platform-browser';
import { PokemonList } from '../../models/pokemon';
import { ButtonComponent } from '../button/button.component';

export interface Usuario {
  nombre: string;
  email: string;
  rol: string;
}

export interface HeadTable {
  head: string;
  fieldName: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type CustomItem<T = Options> = Record<Extract<keyof T, string>, any> &
  RecordOptions;

export type Options = Record<string, string>;

export interface RecordOptions {
  /** Opciones para el collapse */
  collapse?: CollapseOptions;
  /** Clase CSS personalizada de la fila */
  rowClass?: string;
  /** Contenido HTML personalizado */
  innerHtml?: string;
  /** Segundo contendido HTML personalizado */
  innerHtml2?: string | SafeValue;
  /** Clase personalizada para cada columna de cada registro. Por orden */
  classes?: string[];
}

export interface CollapseOptions {
  /** HTML */
  inner: string;
  class?: string;
}

export interface ButtonOptions {
  title: string;
  class?: string;
  tooltip?: string;
  callback: (ev: CustomItem) => void;
}
export interface ButtonsOptions {
  buttons: ButtonOptions[];
  class?: string;
}

export interface SelectOptions {
  /** Key en el *data* que es desplegable *select* */
  selectedKey: string;
  /** Key en el *data* que contiene los *values* del desplegable @see {@link Selected}*/
  selectKeyValues: string;
  /** Clase para el select */
  class?: string;
  disabled?: boolean;
  callback?: (ev: SelectedChange) => void;
}

export interface SelectedChange {
  item: CustomItem;
  selected: string;
}

export const defaultTablePaginationParams = {
  limit: 10,
  offset: 0,
};

@Component({
  selector: 'app-table',
  standalone: true,
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  imports: [ButtonComponent],
})
export class TableComponent {
  headArray = input.required<HeadTable[]>();
  gridArray = input.required<CustomItem[] | PokemonList>();
  buttonsOptions = input<ButtonsOptions>();
  selectOptions = input<SelectOptions>();
  showPaginator = input<boolean>(true);
  prevPage = output<string>();
  nextPage = output<string>();
  dataArray = computed((): CustomItem[] => {
    const gridArray = this.gridArray();
    return Array.isArray(gridArray) ? gridArray : gridArray.results;
  });

  // Propertys for paginator
  currentPage = signal<number>(1);
  itemsPerPage = signal<number>(10);
  totalPages = signal<number>(0);

  protected onButtonsOptionsClick(item: CustomItem, button: ButtonOptions) {
    if (!item) return;
    button.callback?.(item);
  }

  protected onSelectOptionsClick(
    item: CustomItem,
    select: SelectOptions,
    event: Event,
  ) {
    const selected = (event.target as HTMLSelectElement).value;
    if (!item) return;
    select.callback?.({ item, selected });
  }

  protected onNextChange() {
    // this.currentPage.set(page);
    const nextPage = this.gridArray() as PokemonList;
    if (!nextPage.next) return;
    this.nextPage.emit(nextPage.next);
  }

  protected onPrevChange() {
    // this.currentPage.set(page);
    const prevPage = this.gridArray() as PokemonList;
    if (!prevPage.previous) return;
    this.prevPage.emit(prevPage.previous);
  }

  /** Opciones pasadas e options (key: value) */
  // protected op = computed(()=> {
  //   const headArray = this.headArray()
  //   const objects = Object.entries(headArray)
  //   return objects
  // })
}
