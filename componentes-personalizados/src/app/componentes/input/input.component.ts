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
  private innerValue: any;
  private onChangeCallback: (_: any) => void = () => {};
  private onTouchedCallback: () => void = () => {};
  private disabled: boolean = false;

  type = input<string>('text');
  placeholder = input<string>();

  writeValue(value: any): void {
    this.innerValue = value;
  }

  registerOnChange(callback: (_: any) => void): void {
    this.onChangeCallback = callback;
  }

  registerOnTouched(callback: () => void): void {
    this.onTouchedCallback = callback;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: any): void {
    this.innerValue = event.target.value;
    this.onChangeCallback(this.innerValue);
  }

  onBlur(): void {
    this.onTouchedCallback();
  }
}
