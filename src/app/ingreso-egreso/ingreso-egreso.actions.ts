import { createAction, props } from '@ngrx/store';
import { IngresoEgreso } from './../models/ingresoEgreso.model';

export const unSetItems = createAction('[IngresoEgreso] Set Items');

export const setItems = createAction(
  '[IngresoEgreso] setItems',
  props<{ items: IngresoEgreso[] }>()
);
