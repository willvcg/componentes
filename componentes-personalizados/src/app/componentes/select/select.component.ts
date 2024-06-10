import { NgClass } from '@angular/common';
import {
  Component,
  forwardRef,
  input,
  model,
  output,
  signal,
  AfterContentInit,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type Values<
  T extends string | number = string | number,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  V = any,
> = Record<T, V>;
/** Objeto {valor: Texto mostrar en el select} */
export type Selected<T = Values> = Extract<keyof T, string | number>;
export type Selected2<T = Values> = keyof T extends number ? number : string;

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [NgClass],
  templateUrl: './select.component.html',
  styleUrl: './select.component.css',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectComponent),
      multi: true,
    },
  ],
})
export class SelectComponent implements ControlValueAccessor, AfterContentInit {
  id = input<string>(
    `select-${Math.floor((1 + Math.random()) * 0x10000).toString(16)}`,
  );
  label = input<string>('Selecciona una opción');
  class = input<string>('');
  contentClass = input<string>('');
  style = input<string>('');
  labelClass = input<string>('');
  values = input.required<Values>();
  selected = model<Selected>();
  disabled = model<boolean>(false);
  propiedad = input<string>('');
  hidden = input<boolean>(false);
  readonly = input<boolean>(false);

  // @Input('read-only') set _readOnly(e: any) {
  //   if (typeof e === 'string') this.readonly = /^true$/i.test(e) || e === '';
  //   else this.readonly = !!e;
  // }
  selectedChange = output<Selected | undefined>();
  onfocus = output<void>();
  onblur = output<void>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_: unknown) =>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouch = () => {};
  touch!: boolean;
  options = signal<[string, string][] | null>(null);

  ngAfterContentInit() {
    this.options.set(Object.entries(this.values()));
  }

  onSelect(e: Event) {
    this.selected.set((e.target as HTMLSelectElement).value);
    // this.selected =
    //   this.selected() == '0' ? 0 : this.selected()?.trim() ?? this.selected();
    this.onTouch();
    this.onChange(this.selected());
    this.selectedChange.emit(this.selected());
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(value: any): void {
    this.selected.set(value || '');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
