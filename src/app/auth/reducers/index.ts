import { createReducer, on } from "@ngrx/store";
import { User } from "../model/user.model";
import { AuthActions } from "../action-types";

export interface AuthState {
  user: User;
}

export const initialAuthState: AuthState = {
  user: undefined,
};

export const authReducer = createReducer(
  initialAuthState,
  on(AuthActions.login, (_, action) => {
    return {
      user: action.user,
    };
  }),
  on(AuthActions.logout, (_1, _2) => {
    //ważne jest zwracać nową referencję a nie mutować, szczególnie
    //przy stosowaniu startegii OnPush i programowaniu reaktywnym
    return {
      user: undefined,
    };
  })
);
