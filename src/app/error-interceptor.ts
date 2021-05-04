import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  urlsToNotUse: Array<string>;

  constructor(private router: Router) {
    this.urlsToNotUse = [];
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const n = req.url.lastIndexOf('/');
    if ((req.url.slice(n + 1 ) === 'store' && req.method === 'POST') ||
    (req.url.slice(n + 1 ) === 'secret' && req.method === 'GET')){
      return next.handle(req);
    }
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error.error);
        let errorMessage = 'An unknown error occurred';

        if (error.error?.errors) {
          errorMessage = error.error.errors[0].message;
        } else if (typeof error.error.errors === 'string') {
          errorMessage = error.error.errors;
        }
        if (errorMessage === 'email must be verified!'){
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
            confirmButtonText: `verify email`,
          }).then((result => {
            this.router.navigate(['confirmation']);
          }));
        }
        else{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: errorMessage,
          });
        }

        return throwError(error);
      })
    );
  }
}
