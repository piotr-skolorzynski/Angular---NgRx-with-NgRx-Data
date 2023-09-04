import { ActionReducerMap, createReducer, on } from "@ngrx/store";
import { User } from "../model/user.model";
import { AuthActions } from "../action-types";
import { routerReducer } from "@ngrx/router-store";

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export interface AppState {}

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (_, action) => {
    return {
      user: action.user,
    };
  }),
  on(AuthActions.logout, (_1, _2) => {
    return {
      user: undefined,
    };
  })
);
