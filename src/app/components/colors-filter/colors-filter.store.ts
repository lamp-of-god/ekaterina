import {patchState, signalStore, withComputed, withMethods, withState} from "@ngrx/signals";
import {withStorageSync} from "@angular-architects/ngrx-toolkit";
import { computed } from "@angular/core";

export type SearchTerm = string;

type SearchCount = number;
type SearchHistory = Record<SearchTerm, SearchCount>;

interface IColorsFilterState {
  searchHistory: SearchHistory,
}

export const COLORS_FILTER_STORE = signalStore(
  withState<IColorsFilterState>(() => ({
    searchHistory: {},
  })),
  withComputed(({ searchHistory }) => ({
    searchTermsBySearchFrequency: computed(() => Object
      .entries(searchHistory())
      .sort(([, count1], [, count2]) => count1 < count2 ? 1 : -1)
      .map(([ searchTerm ]) => searchTerm)
    ),
  })),
  withMethods(store => ({
    addSearchedItem(value: string) {
      patchState(store, state => ({
        searchHistory: {
          ...state.searchHistory,
          [value]: (state.searchHistory[value] ?? 0) + 1,
        },
      }));
    },
    removeSearchedItem(value: string) {
      patchState(store, state => {
        const searchHistory = {...state.searchHistory};

        delete searchHistory[value];

        return { searchHistory };
      });
    },
  })),
  withStorageSync('colors-filter-store'),
);
