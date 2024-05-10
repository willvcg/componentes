import { NgClass } from '@angular/common';
import {
  Component,
  Optional,
  Self,
  computed,
  input,
  model,
  output,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
} from '@angular/forms';
import { Subscription } from 'rxjs';
import { Values } from '../select/select.component';

@Component({
  selector: 'app-input-custom',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormsModule],
  templateUrl: './input-custom.component.html',
  styleUrl: './input-custom.component.css',
})
export class InputCustomComponent implements ControlValueAccessor {
  id = input<string>(
    `input-${Math.floor((1 + Math.random()) * 0x10000).toString(16)}`
  );
  placeholder = input<string>('');
  type = input<
    'text' | 'number' | 'textarea' | 'checkbox' | 'toggle' | 'date' | 'select'
  >('text');
  label = input<string>('');
  class = input<string>('');
  classInput = input<string>('');
  style = input<string>('');
  value = model<any>('');
  values = input<Values>();
  hidden = input<boolean>(false);
  noHideDisabled = input<boolean>(false);
  disabled = model<boolean>(false);
  errorMsg = input<string>('');
  validation = input<ValidationErrors | null>();
  errors = input<Record<string, string>>();
  errorClass = input<string>('');
  readonly = input<boolean>(false);
  autocomplete = input<boolean>(false);
  maxlength = input<string | number | null>(null);
  showError = input<'always' | 'never' | 'touched'>();
  required = input<boolean>(false);

  onfocus = output<void>();
  valueChange = output<string>();
  touched = output<boolean>();
  click = output<void>();
  keyEnter = output<Event>();

  onChange = (_: any) => {};
  _onTouch = () => {};
  touch!: boolean;
  noAutoMargin?: boolean;
  ngControl!: NgControl;
  selectFocused = false;

  private timeCreated?: number;
  private statusChanged$?: Subscription;

  protected checkValue = computed(() => {
    const valuecheck = this.value;

    if (typeof valuecheck === 'string') {
      return valuecheck != '0' ? true : false;
    }
    return false;
  });

  constructor(@Optional() @Self() ngControl: NgControl) {
    this.ngControl = ngControl;
    if (this.ngControl) this.ngControl.valueAccessor = this;
  }

  setError() {
    // const validation = this.validation ?? this.ngControl?.control?.errors
    // const error = Object.keys(validation ?? {})?.shift() ?? -1
    // const msg = !this.readonly && this.errors && this.errors[error] || ''
    // this.errorMsg = msg
  }

  onInput(e: EventTarget | null) {
    // if (this.type() === 'checkbox' || this.type() === 'toggle') {
    //   // this.value = (e as HTMLInputElement)?.checked ?? false
    //   // this.valueChange.emit(!!this.value)
    // }
    // else
    //   this.value.set((e as HTMLInputElement)?.value.trim() ?? '')
    this.onChange(this.value);
    // this.onTouch()
  }

  writeValue(value: any): void {
    if (value === null || value === undefined || value === '')
      this.touch = false;
    this.value = value ?? '';
    //this.touch = true
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
