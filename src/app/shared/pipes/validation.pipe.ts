import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'validation',
  standalone: true,
})
export class ValidationPipe implements PipeTransform {
  transform(value: any, messages: object): unknown {
    return value[Object.keys(messages)[0]];
  }
}
