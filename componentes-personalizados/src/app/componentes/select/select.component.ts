import { NgClass } from '@angular/common';
import { Component, forwardRef, input, model, output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type Values<
  T extends string | number = string | number,
  V = any
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
export class SelectComponent implements ControlValueAccessor {
  id = input<string>(
    `select-${Math.floor((1 + Math.random()) * 0x10000).toString(16)}`
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
  selectedChange = output<any>();
  onfocus = output<void>();
  onblur = output<void>();

  onChange = (_: any) => {};
  onTouch = () => {};
  touch!: boolean;
  op!: [string, string][];

  ngAfterContentInit() {
    this.op = Object.entries(this.values());
  }

  onSelect(e: Event) {
    this.selected.set((e.target as HTMLSelectElement).value);
    // this.selected =
    //   this.selected() == '0' ? 0 : this.selected()?.trim() ?? this.selected();
    this.onTouch();
    this.onChange(this.selected());
    this.selectedChange.emit(this.selected());
  }

  writeValue(value: any): void {
    this.selected.set(value || '');
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
