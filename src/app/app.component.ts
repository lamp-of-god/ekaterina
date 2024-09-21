import {Component, inject, signal} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {ColorCardsListComponent, ColorsFilterComponent} from "./components";
import {APP_STATE} from "./state/app.state";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    ColorCardsListComponent,
    ColorsFilterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [ APP_STATE ],
  host: {
    '[style.--active-color]': '_appState.activeColor.colorCode()',
  }
})
export class AppComponent {

  protected _appState = inject(APP_STATE);

  protected _colorFilter = signal<string | null>(null);

}
