import {Component, inject, output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatButton} from "@angular/material/button";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {COLORS_FILTER_STORE} from "./colors-filter.store";
import {SearchControlComponent} from "../search-control/search-control.component";

@Component({
  selector: 'app-colors-filter',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatIcon,
    MatButton,
    SearchControlComponent,
  ],
  templateUrl: './colors-filter.component.html',
  styleUrl: './colors-filter.component.scss',
  providers: [ COLORS_FILTER_STORE ],
})
export class ColorsFilterComponent {

  protected readonly _colorFilterStore = inject(COLORS_FILTER_STORE);

  protected _searchFormCtrl = new FormControl<string | null>(null);

  readonly filterChanged = output<string | null>();

  protected _submit(): void {
    const value = this._searchFormCtrl.value;

    this.filterChanged.emit(value);

    if (value)
      this._colorFilterStore.addSearchedItem(value!);
  }

}
