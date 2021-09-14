import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './../../app.reducer';
import { IngresoEgreso } from './../../models/ingresoEgreso.model';

import { MultiDataSet, Label } from 'ng2-charts';
@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: [
  ]
})
export class EstadisticaComponent implements OnInit {

  ingresos: number = 0;
  egresos: number = 0;

  totalIngreso: number = 0;
  totalEgreso: number = 0;

  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [];

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.store.select('ingresoEgreso').subscribe(({ items }) => this.generarEstadistica(items))
  }

  generarEstadistica(items: IngresoEgreso[]) {
    this.ingresos = 0;
    this.egresos = 0;

    this.totalIngreso = 0;
    this.totalEgreso = 0;

    items.forEach(item => {
      if (item.tipo === 'Ingreso') {
        this.totalIngreso += item.monto;
        this.ingresos++;
      } else {
        this.totalEgreso += item.monto;
        this.egresos++;
      }
    });
    this.doughnutChartData = [[this.totalIngreso, this.totalEgreso]]
  }

}
