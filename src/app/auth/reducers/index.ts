import {
  ActionReducer,
  ActionReducerMap,
  MetaReducer,
  createReducer,
  on,
} from "@ngrx/store";
import { User } from "../model/user.model";
import { AuthActions } from "../action-types";
import { routerReducer } from "@ngrx/router-store";
import { environment } from "../../../environments/environment";

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

export function logger(reducer: ActionReducer<any>): ActionReducer<any> {
  return (state, action) => {
    //akcje do wykonania zanim zostanie odpalony docelowy reducer
    console.log("state before: ", state);
    console.log("action", action);

    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger]
  : [];

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
