import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, first } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IRegistration } from '../../core/models/registration.model';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(
    private http: HttpClient
  ) { }

  register(user: IRegistration): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(environment.ApiBaseUrl + '/signup', user).pipe(first()).subscribe(res => {
        observer.next(res);
      }, error => {
        observer.next(error.error);
      });
    });
  }
}
