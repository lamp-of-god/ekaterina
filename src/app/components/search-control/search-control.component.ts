import {Component, computed, effect, input, output, signal} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {HighlightPipe} from "../../pipes";
import {MatAutocomplete, MatAutocompleteTrigger, MatOption} from "@angular/material/autocomplete";
import {MatFormField, MatSuffix} from "@angular/material/form-field";
import {MatIcon} from "@angular/material/icon";
import {MatIconButton} from "@angular/material/button";
import {MatInput} from "@angular/material/input";

type ControlValue = string | null;

@Component({
  selector: 'app-search-field',
  standalone: true,
  imports: [
    FormsModule,
    HighlightPipe,
    MatAutocomplete,
    MatAutocompleteTrigger,
    MatFormField,
    MatIcon,
    MatIconButton,
    MatInput,
    MatOption,
    MatSuffix
  ],
  templateUrl: './search-control.component.html',
  styleUrl: './search-control.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: SearchControlComponent
    }
  ],
})
export class SearchControlComponent implements ControlValueAccessor {

  placeholder = input<string>('');

  searchTerms = input<string[]>([]);

  readonly suggestionSelected = output<void>();

  readonly removeSearchTerm = output<string>();

  protected readonly _value = signal<ControlValue>(null);

  protected readonly _isAutocompletePanelOpened = signal(false);

  protected _filteredSearchTerms = computed(() => {
    const normalizedValue = this._value()?.toLowerCase();
    const filteredSearchTerms = normalizedValue
      ? this.searchTerms().filter(searchTerm => {
        const normalizedSearchTerm = searchTerm.toLowerCase();

        return normalizedSearchTerm.includes(normalizedValue) && (normalizedSearchTerm !== normalizedValue);
      })
      : this.searchTerms();

    return filteredSearchTerms.slice(0, 5)
  });

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onChange = (_value: ControlValue) => {
    // Does nothing
  };

  constructor() {
    effect(() => void this.onChange(this._value()));
  }

  writeValue(value: ControlValue): void {
    this._value.set(value);
  };

  registerOnChange(onChange: typeof this.onChange): void {
    this.onChange = onChange;
  };

  registerOnTouched(): void {
    // Does nothing
  };

}
