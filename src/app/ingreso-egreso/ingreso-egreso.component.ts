import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import { IngresoEgreso } from './../models/ingresoEgreso.model';
import { AppState } from './../app.reducer';
import Swal from 'sweetalert2';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import * as uiActions from './../shared/ui.actions'

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: [
  ]
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  public ingresoForm: FormGroup;
  public tipo: string = 'Ingreso';
  public cargando: boolean = false;
  private uiSubscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private ingresoEgresoService: IngresoEgresoService,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.ingresoForm = this.fb.group({
      descripcion: ['', Validators.required],
      monto: ['', Validators.required],
    });

    this.uiSubscription = this.store.select('ui').subscribe(ui => this.cargando = ui.isLoading);
  }

  ngOnDestroy(): void {
    this.uiSubscription.unsubscribe();
  }

  guardar() {
    if (this.ingresoForm.invalid) {
      return;
    }
    this.store.dispatch(uiActions.isLoading());

    const { descripcion, monto } = this.ingresoForm.value;

    const ingresoEgreso = new IngresoEgreso(descripcion, monto, this.tipo);

    this.ingresoEgresoService.crearIngresoEgreso(ingresoEgreso)
      .then(() => {
        this.ingresoForm.reset();
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire('Registro Creado', descripcion, 'success');
      })
      .catch(err => {
        this.store.dispatch(uiActions.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }

}
