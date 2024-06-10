import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'sortArray',
  standalone: true,
})
export class SortArrayPipe implements PipeTransform {
  transform(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    array: any[],
    property: string,
    order: 'asc' | 'desc' = 'asc',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): any[] {
    if (!array) return [];
    return array.sort((a, b) => {
      if (order === 'asc') {
        return a[property] < b[property] ? -1 : 1;
      } else {
        return b[property] < a[property] ? -1 : 1;
      }
    });
  }
}
