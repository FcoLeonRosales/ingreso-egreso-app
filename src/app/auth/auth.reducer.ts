import { createReducer, on } from '@ngrx/store';
import { Usuario } from '../models/usuario.models';
import * as auth from './auth.actions';

export interface State {
  user: Usuario;
}

export const initialState: State = {
  user: null,
}

const _authReducer = createReducer(initialState,

  on(auth.setUser, (state, { user }) => ({ ...state, user: { ...user } })),
  on(auth.unSetUser, (state) => ({ ...state, user: null })),

);

export function authReducer(state, action) {
  return _authReducer(state, action);
}
