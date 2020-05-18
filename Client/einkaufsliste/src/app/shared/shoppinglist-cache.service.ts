import {Injectable} from '@angular/core';
import {Listentry, Shoppinglist, User} from "./shoppinglist";
import {Observable, throwError} from "rxjs";
import {catchError, retry} from "rxjs/operators";
import {HttpClient} from '@angular/common/http';
import {AuthenticationService} from "./authentication.service";
import {Feedback} from "./feedback";

// @Injectable({
//   providedIn: 'root'
// })
@Injectable()
export class ShoppinglistCacheService {

  private api = 'http://einkaufsliste.s1710456034.student.kwmhgb.at/api';

  //shoppinglists: Shoppinglist[];

  constructor(private http: HttpClient) {

  }

  getAll(): Observable<Array<Shoppinglist>> {
    return this.http.get(`${this.api}/lists`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getWhereNoHelper(): Observable<Array<Shoppinglist>> {
    return this.http.get(`${this.api}/lists`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getSingle(id: number): Observable<Shoppinglist> {
    console.log(id);
    return this.http.get<Shoppinglist>(`${this.api}/list/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  saveFeedback(feedback: Feedback, id: number): Observable<Feedback>{
    return this.http.put<Shoppinglist>(`${this.api}/feedback/${id}`, feedback).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getListsByCreatorId(id: number): Observable<Array<Shoppinglist>> {
    return this.http.get(`${this.api}/creator/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getListsByHelperId(id: number): Observable<Array<Shoppinglist>> {
    return this.http.get(`${this.api}/helper/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  create(shoppinglist: Shoppinglist): Observable<any> {
    return this.http.post(`${this.api}/list`, shoppinglist).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  update(shoppinglist: Shoppinglist): Observable<any> {
    return this.http.put(`${this.api}/list/${shoppinglist.id}`, shoppinglist).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  remove(id: number): Observable<any> {
    return this.http.delete(`${this.api}/list/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.api}/user/${id}`).pipe(retry(3)).pipe(catchError(this.errorHandler));
  }

  private errorHandler(error: Error | any): Observable<any> {
    return throwError(error);
  }
}
