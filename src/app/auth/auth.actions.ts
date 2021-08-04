import { createAction, props } from '@ngrx/store';
import { Usuario } from '../models/usuario.models';

export const setUser = createAction(
  '[Auth] setUser',
  props<{ user: Usuario }>()
);

export const unSetUser = createAction('[Auth] unSetUser');

// export const action2Success = createAction(
//   '[nameSpace] action2Description Success',
//   props<{payload2Type}>()
// );

// export const action3Failure = createAction(
//   '[nameSpace] action3Description Failure',
//   props<{payload3Type}>()
// );
