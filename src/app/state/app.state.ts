import {patchState, signalStore, withMethods, withState} from "@ngrx/signals";
import {Color} from "../domain";
import {COLOR_WHITE} from "../data";

export const APP_STATE = signalStore(
  withState(() => ({
    activeColor: COLOR_WHITE,
  })),
  withMethods(store => ({
    setActiveColor(color: Color): void {
      patchState(store, () => ({ activeColor: color }));
    },
  })),
);
