import { Component, forwardRef, input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.css',
})
export class InputComponent implements ControlValueAccessor {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private innerValue: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private onChangeCallback: (_: any) => void = () =>
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private onTouchedCallback: () => void = () => {};
  private disabled = false;

  type = input<string>('text');
  placeholder = input<string>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  writeValue(value: any): void {
    this.innerValue = value;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  registerOnChange(callback: (_: any) => void): void {
    this.onChangeCallback = callback;
  }

  registerOnTouched(callback: () => void): void {
    this.onTouchedCallback = callback;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onInputChange(event: any): void {
    this.innerValue = event.target.value;
    this.onChangeCallback(this.innerValue);
  }

  onBlur(): void {
    this.onTouchedCallback();
  }
}
