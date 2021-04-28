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

  constructor(private router: Router) {

  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

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
