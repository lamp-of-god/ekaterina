import {Component, computed, inject, input} from '@angular/core';
import { COLORS } from '../../data';
import {MatCard} from "@angular/material/card";
import {APP_STATE} from "../../state/app.state";
import {ColorCardComponent} from "../color-card";

@Component({
  selector: 'app-color-cards-list',
  standalone: true,
  imports: [
    MatCard,
    ColorCardComponent
  ],
  templateUrl: './color-cards-list.component.html',
  styleUrl: './color-cards-list.component.scss',
})
export class ColorCardsListComponent {

  protected _appState = inject(APP_STATE);

  filter = input<string | null>(null);

  protected _colors = computed(() => {
    const filterValue = this.filter()?.toLowerCase();

    return filterValue
      ? COLORS.filter(color => color.colorName.toLowerCase().includes(filterValue))
      : COLORS;
  });

}
