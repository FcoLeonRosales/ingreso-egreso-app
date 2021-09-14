import { Pipe, PipeTransform } from '@angular/core';
import { IngresoEgreso } from '../models/ingresoEgreso.model';

@Pipe({
  name: 'ordenIngreso'
})
export class OrdenIngresoPipe implements PipeTransform {

  transform(items: IngresoEgreso[]): IngresoEgreso[] {
    return items.slice().sort((a) => {
      if (a.tipo === 'Ingreso') {
        return -1
      } else {
        return 1
      }
    });
  }

}
