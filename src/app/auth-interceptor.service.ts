import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let request = req;
    const obj: string = JSON.parse(localStorage.getItem('currentUser'))
    if (obj) {
      const token: string = JSON.parse(localStorage.getItem('currentUser')).token;
      if (token) {
        request = req.clone({
          setHeaders: {
            authorization: `Bearer ${token}`
          }
        });
      }
    }
    return next.handle(request).pipe(
      catchError(this.manejadorError)
    );
  }

  manejadorError(error: HttpErrorResponse){
    console.log("Error Interceptado");
    console.log(error);
    return throwError('Error Personalizado')
  }

}