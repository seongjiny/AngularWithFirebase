import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reverse'
})
export class ReversePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value) {
      /*
        - slice make copy of array
        - we are assuming value is array here
      */
      return value.slice().reverse();
    }
    return null;
  }

}
