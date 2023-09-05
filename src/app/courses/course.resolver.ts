import { Injectable } from "@angular/core";
import { Course } from "./model/course";
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from "@angular/router";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";
import { AppState } from "../auth/reducers";
import { finalize, first, tap } from "rxjs/operators";
import { loadAllCourses } from "./courses.actions";

@Injectable()
export class CoursesResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.pipe(
      tap(() => {
        //flaga zabezpiecza przed równolełym odpaleniu zapytania
        if (!this.loading) {
          this.loading = true;
          this.store.dispatch(loadAllCourses());
        }
      }),
      first(), //ten operator w tej implementacji służy do
      //wymuszenia zakończenia subskrybcji, tylko wtedy router
      //zakończy przejście do wybranego komponentu
      finalize(() => (this.loading = false))
    );
  }
}
