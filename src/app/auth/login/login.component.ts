import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { Store } from "@ngrx/store";
import { noop } from "rxjs";
import { tap } from "rxjs/operators";

import { AppState } from "../reducers";
import { AuthService } from "../auth.service";

@Component({
  selector: "login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) {
    this.form = fb.group({
      email: ["test@angular-university.io", [Validators.required]],
      password: ["test", [Validators.required]],
    });
  }

  ngOnInit() {}

  login() {
    const credentials = this.form.value;
    //wykorzystanie serwisu do uwierzytelnienia użytkownika w DB
    this.auth
      .login(credentials.email, credentials.password)
      .pipe(
        //jako side effect chcemy zapisać
        //uwierzytelnionego użytkownika w store
        tap((user) => {
          console.log(user);

          //wykonaj akcję w store
          //zapisz aktualnie uwierzytelnionego
          //uzytkownika
          // this.store.dispatch();

          //przekieruj na stronę z kursami
          this.router.navigateByUrl("/courses");
        })
      )
      .subscribe(
        //oznacza - nic nie rób w razie sukcesu
        noop,
        //error handling
        () => alert("Login has failed!")
      );
  }
}
