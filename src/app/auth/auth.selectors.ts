import { createSelector } from "@ngrx/store";

//posiada własną pamięć także
export const isLoggedIn = createSelector(
  (state) => state["auth"], //mapuj auth state
  (authState) => !!authState.user //sprawdź czy user istnieje
);

export const isLoggedOut = createSelector(isLoggedIn, (loggedIn) => !loggedIn);
