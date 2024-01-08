import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'createdAtSort'
})
export class CreatedAtSortPipe implements PipeTransform {
  transform(value: any[], year: number, month: number): any[] {
    if (!value || !Array.isArray(value)) {
      return value;
    }
    const sorted = value.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
    return sorted;
  }
}
