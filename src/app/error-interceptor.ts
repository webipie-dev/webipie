import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler, HttpEvent, HttpErrorResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';
import Swal from 'sweetalert2';

export class ErrorInterceptor implements HttpInterceptor {

  constructor() {

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
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: errorMessage,
        });

        return throwError(error);
      })
    );
  }
}
