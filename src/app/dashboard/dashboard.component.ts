import { Component, OnDestroy, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { AppState } from './../app.reducer';
import { IngresoEgresoService } from './../services/ingreso-egreso.service';
import * as ingresoEgresoActions from './../ingreso-egreso/ingreso-egreso.actions'
import { IngresoEgreso } from '../models/ingresoEgreso.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [
  ]
})
export class DashboardComponent implements OnInit, OnDestroy {

  private userSubs: Subscription;
  private ingresoEgresoSubs: Subscription;

  constructor(
    private store: Store<AppState>,
    private ingresoEgresoService: IngresoEgresoService
  ) { }

  ngOnInit(): void {
    this.userSubs = this.store.select('user')
      .pipe(
        filter(auth => auth.user !== null)
      )
      .subscribe(({ user }) => {

        this.ingresoEgresoSubs = this.ingresoEgresoService.initIngresoEgresoListener(user.uid)

          .subscribe((ingresoEgresoFB: IngresoEgreso[]) => {

            this.store.dispatch(ingresoEgresoActions.setItems({ items: ingresoEgresoFB }));

          });
      });
  }

  ngOnDestroy() {
    this.ingresoEgresoSubs.unsubscribe();
    this.userSubs.unsubscribe();
  }

}
