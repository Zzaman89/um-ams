import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest
} from '@angular/common/http';

import { Observable } from 'rxjs';

/** Inject With Credentials into the request */
@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
    Observable<HttpEvent<any>> {

    const token = localStorage.getItem('access_token');

    req = req.clone({
      withCredentials: false,
      headers: req.headers.set('X-Jwt-Token', `Bearer ${token}`)
    });

    return next.handle(req);
  }
}
