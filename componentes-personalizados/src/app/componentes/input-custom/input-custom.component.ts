import { NgClass } from '@angular/common';
import {
  Component,
  OnInit,
  Optional,
  Self,
  computed,
  effect,
  input,
  model,
  output,
  untracked,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
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
export class InputCustomComponent implements ControlValueAccessor, OnInit {
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

    effect(() => {
      const validation = this.validation();
      const errors = this.errors();
      if (validation && errors) {
        this.setError();
      } else if (errors) {
        // this.errorMsg = '';
      }
    });

    effect(() => {
      const errors = this.errors();
      if (this.ngControl?.control) {
        this.setError();
      }
    });

    effect(() => {
      const showError = this.showError();
      if (showError === 'always') {
        this.touch = true;
      }
    });

    effect(() => {
      const hidden = this.hidden();
      this.ngControl?.control?.clearValidators();
      !this.noHideDisabled() && this.ngControl?.control?.disable();
      // this.getterControlValid();
      if (hidden === false) {
        !this.noHideDisabled() && this.ngControl?.control?.enable();
        this.required() &&
          this.ngControl?.control?.addValidators(Validators.required);
        this.ngControl?.control?.updateValueAndValidity({
          onlySelf: true,
          emitEvent: false,
        });
        // this.getterControlValid();
      }
    });

    effect(() => {
      const required = this.required();
      const hidden = this.hidden();
      if (required && !hidden) {
        this.ngControl?.control?.addValidators(Validators.required);
        this.ngControl?.control?.updateValueAndValidity({
          onlySelf: true,
          emitEvent: false,
        });
      } else if (required === false) {
        this.ngControl?.control?.removeValidators(Validators.required);
        this.touch = false;
      }
    });

    effect(() => {
      const readonly = this.readonly();
      if (readonly) {
        this.touch = false;
        // this.errorMsg = ''
        this.ngControl?.control?.clearValidators();
      } else if (readonly === false) {
        this.touch = true;
        this.setError();
      }
    });

    // effect(() => {
    //   const value = this.value();
    //   if (this.type() === 'select' && value == '0') {
    //     // this.value = 0
    //   }
    // });
  }

  ngOnInit(): void {
    // this.placeholder = this.placeholder.trim() || this.label || ' ';
    if (this.ngControl?.control) {
      this.ngControl.control.markAsTouched = () => this.onTouch();
      this.statusChanged$ = this.ngControl.control.statusChanges.subscribe(
        (status) => {
          if (Date.now() < this.timeCreated! + 1000) return;
          if (status === 'INVALID') {
            this.onTouch();
          } /*else if (status === 'VALID') this.errorMsg = '';*/
        }
      );
    }
  }

  ngAfterViewInit() {
    // this.getterControlValid();
    this.timeCreated = Date.now();
  }

  private onTouch() {
    if (!this.touch) {
      this.touch = true;
      this._onTouch && this._onTouch();
      this.touched.emit(true);
    }
    this.setError();
  }

  // private getterControlValid() {
  //   // @ts-ignore
  //   this.ngControl?.control.__defineGetter__(
  //     'valid',
  //     function (this: AbstractControl) {
  //       return this.status === 'DISABLED' || this.status === 'VALID';
  //     }
  //   );
  // }

  setError() {
    const validation = this.validation() ?? this.ngControl?.control?.errors;
    const error = Object.keys(validation ?? {})?.shift() ?? -1;
    const msg =
      (!this.readonly() && this.errors() && this.errors()?.[error]) || '';
    // this.errorMsg = msg;
  }

  markAsTouched() {
    this.onTouch();
  }

  onInput(e: EventTarget | null) {
    // if (this.type() === 'checkbox' || this.type() === 'toggle') {
    //   // this.value = (e as HTMLInputElement)?.checked ?? false
    //   // this.valueChange.emit(!!this.value)
    // }
    // else
    //   this.value.set((e as HTMLInputElement)?.value.trim() ?? '')
    this.onChange(this.value);
    this.onTouch();
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
    untracked(() => {
      this.disabled.set(isDisabled);
    });
  }
}
