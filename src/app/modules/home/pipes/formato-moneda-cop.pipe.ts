import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatoMonedaCop',
})
export class FormatoMonedaCopPipe implements PipeTransform {
  transform(value: number): string {
    if (isNaN(value)) {
      return '';
    }
    const formattedValue = value.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
    return `$${formattedValue}`;
  }
}
