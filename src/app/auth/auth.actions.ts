import { createAction, props } from "@ngrx/store";
import { User } from "./model/user.model";

//nasza akcja, którą można wywołać w metodzie dispatch
export const login = createAction(
  "[Login Page] User Login",
  props<{ user: User }>()
);
