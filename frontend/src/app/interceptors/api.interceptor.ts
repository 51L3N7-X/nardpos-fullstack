import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  private activeRequests = 0;

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.activeRequests++;

    // Add common headers
    const apiRequest = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });

    return next.handle(apiRequest).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'An unexpected error occurred';

        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          switch (error.status) {
            case 400:
              errorMessage = error.error?.message || 'Bad request';
              break;
            case 401:
              errorMessage = 'Unauthorized access';
              break;
            case 403:
              errorMessage = 'Access forbidden';
              break;
            case 404:
              errorMessage = 'Resource not found';
              break;
            case 409:
              errorMessage = error.error?.message || 'Conflict - resource already exists';
              break;
            case 500:
              errorMessage = 'Internal server error';
              break;
            default:
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
          }
        }

        console.error('HTTP Error:', errorMessage);
        return throwError(() => new Error(errorMessage));
      }),
      finalize(() => {
        this.activeRequests--;
      })
    );
  }

  get isLoading(): boolean {
    return this.activeRequests > 0;
  }
}
