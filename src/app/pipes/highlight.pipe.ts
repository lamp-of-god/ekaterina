import {Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
  standalone: true,
})
export class HighlightPipe implements PipeTransform {

  transform(value: string, searchTerm: string | null): string | null {
    const sanitizedValue = value
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    if (!searchTerm || !sanitizedValue) {
      return sanitizedValue;
    }
    const regex = new RegExp(`(${searchTerm})`, 'gi');

    return sanitizedValue.replace(regex, `<strong>$1</strong>`);
  }

}
