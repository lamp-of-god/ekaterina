import {Component, input} from '@angular/core';
import {MatCard} from "@angular/material/card";
import {Color} from "../../domain";

@Component({
  selector: 'app-color-card',
  standalone: true,
  imports: [
    MatCard
  ],
  templateUrl: './color-card.component.html',
  styleUrl: './color-card.component.scss'
})
export class ColorCardComponent {

  color = input.required<Color>();

  active = input(false);

}
