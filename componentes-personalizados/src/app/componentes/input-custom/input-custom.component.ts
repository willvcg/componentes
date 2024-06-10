import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  OnInit,
  Optional,
  Self,
  computed,
  effect,
  inject,
  input,
  model,
  output,
  signal,
  untracked,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  ControlValueAccessor,
  FormsModule,
  NgControl,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { Values } from '../select/select.component';

@Component({
  selector: 'app-input-custom',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass, FormsModule],
  templateUrl: './input-custom.component.html',
  styleUrl: './input-custom.component.css',
})
export class InputCustomComponent
  implements ControlValueAccessor, OnInit, AfterViewInit
{
  id = input<string>(
    `input-${Math.floor((1 + Math.random()) * 0x10000).toString(16)}`,
  );
  placeholder = input<string>();
  type = input<
    'text' | 'number' | 'textarea' | 'checkbox' | 'toggle' | 'date' | 'select'
  >('text');
  label = input<string>('');
  class = input<string>('');
  classInput = input<string>('');
  style = input<string>('');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value = model<any>('');
  values = input<Values>();
  hidden = input<boolean>();
  noHideDisabled = input<boolean>();
  disabled = model<boolean>();
  errorMsg = input<string>();
  validation = input<ValidationErrors | undefined | null>();
  errors = input<Record<string, string>>();
  errorClass = input<string>('');
  readonly = input<boolean>();
  autocomplete = input<boolean>(false);
  maxlength = input<string | number | null>(null);
  showError = input<'always' | 'never' | 'touched'>();
  required = input<boolean>(false);

  onfocus = output<void>();
  valueChange = output<typeof this.value>();
  touched = output<boolean>();
  click = output<void>();
  keyEnter = output<Event>();

  private destroyRef = inject(DestroyRef);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
  onChange = (_: any) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _onTouch = () => {};
  touch!: boolean;
  noAutoMargin?: boolean;
  ngControl!: NgControl;
  selectFocused = false;

  private timeCreated = signal<number | null>(null);

  protected _errorMsg = signal<string>('');

  protected checkValue = computed(() => {
    const valuecheck = this.value;

    if (typeof valuecheck === 'string') {
      return valuecheck != '0' ? true : false;
    }
    return false;
  });

  protected _placeholder = computed(
    () => this.placeholder()?.trim() || this.label() || ' ',
  );

  protected valueComputed = computed(() => {
    const value = this.value;
    untracked(() => {
      this.valueChange.emit(value);
    });
  });

  constructor(@Optional() @Self() ngControl: NgControl) {
    this.ngControl = ngControl;
    if (this.ngControl) this.ngControl.valueAccessor = this;

    effect(() => {
      const validation = this.validation();
      const errors = this.errors();
      if (validation && errors) {
        this.ngControl?.control?.addValidators(Validators.required);
        this.ngControl?.control?.updateValueAndValidity({
          onlySelf: true,
          emitEvent: false,
        });
        this.setError();
      } else if (!validation && errors) {
        untracked(() => {
          this._errorMsg.set('');
        });
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
      if (hidden) {
        this.ngControl?.control?.clearValidators();
        !this.noHideDisabled() && this.ngControl?.control?.disable();
        // this.getterControlValid();
      }
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
        this._errorMsg.set('');
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

    effect(() => {
      const errorMsg = this.errorMsg();
      untracked(() => {
        if (errorMsg) {
          this._errorMsg.set(errorMsg);
        }
      });
    });
  }

  ngOnInit(): void {
    this.implementOnTouchToControl();
    this.checkStatusChangesFromControl();
  }

  ngAfterViewInit() {
    // this.getterControlValid();
    this.timeCreated.set(Date.now());
  }

  private implementOnTouchToControl(): void {
    if (!this.ngControl?.control) return;
    this.ngControl.control.markAsTouched = () => this.onTouch();
  }

  private checkStatusChangesFromControl(): void {
    if (!this.ngControl?.control) return;
    this.ngControl.control.statusChanges
      .pipe(
        takeUntilDestroyed(this.destroyRef),
        tap((status) => {
          if (Date.now() < this.timeCreated()! + 1000) return;
          if (status === 'INVALID') {
            this.onTouch();
          } else if (status === 'VALID') this._errorMsg.set('');
        }),
      )
      .subscribe();
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
    untracked(() => {
      this._errorMsg.set(msg);
    });
  }

  markAsTouched() {
    this.onTouch();
  }

  onInput(e: EventTarget | null) {
    // if (this.type() === 'checkbox' || this.type() === 'toggle') {
    //   // this.value = (e as HTMLInputElement)?.checked ?? false
    //   // this.valueChang1e.emit(!!this.value)
    // }
    // else
    //   this.value.set((e as HTMLInputElement)?.value.trim() ?? '')
    this.onChange(this.value);
    this.onTouch();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(value: any): void {
    if (value === null || value === undefined || value === '')
      this.touch = false;
    this.value = value ?? '';
    //this.touch = true
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnTouched(fn: any): void {
    this._onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    untracked(() => {
      this.disabled.set(isDisabled);
    });
  }
}
