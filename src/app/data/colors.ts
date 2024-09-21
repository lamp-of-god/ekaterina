import {faker} from "@faker-js/faker/locale/en";
import {Color} from "../domain";
import colorNameList from 'color-name-list/dist/colornames.json';

faker.seed(0);

export const COLOR_WHITE: Color = {
  colorName: "White",
  colorCode: "#ffffff"
};

export const COLORS = [
  COLOR_WHITE,
  ...Array.from({length: 19}).map(() => {
    const color = faker.helpers.arrayElement(colorNameList);

    return {
      colorName: color.name,
      colorCode: color.hex,
    };
  })
];
