import { Injectable } from '@angular/core'
import { HttpClient, HttpErrorResponse } from '@angular/common/http'
import { MatSnackBar } from '@angular/material/snack-bar'
import { catchError, tap } from 'rxjs/operators'
import { Observable, throwError } from 'rxjs'

import { User } from '@app/interfaces/user.interface'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null

  constructor(
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) {}

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${environment.baseUrl}/api/auth/login`, user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }
        ),
        catchError(this.handleError.bind(this))
      )
  }

  private handleError(error: HttpErrorResponse) {
    const {message} = error.error
    let errorText

    switch (message) {
      case 'USER_NO_FOUND':
        errorText = 'User is not found'
        break
      case 'USER_WRONG_PASSWORD':
        errorText = 'Invalid password. Try again'
        break
      case 'TRY_AGAIN':
        errorText = 'Something went wrong. Try again'
        break
    }

    this.snackBar.open(errorText, 'Close', {
      verticalPosition: 'top',
      horizontalPosition: 'center',
      duration: 2000,
      panelClass: ['error-snackbar']
    })

    return throwError(error)
  }

  setToken(token: string) {
    this.token = token
  }

  getToken(): string {
    return this.token
  }

  isAuthenticated(): boolean {
    return !!this.token
  }

  logout() {
    this.setToken(null)
    localStorage.clear()
  }
}
