import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

import { User } from '@interfaces/user.interface';
import { environment } from '@environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = null

  constructor(private http: HttpClient) {}

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>(`${environment.baseUrl}/api/auth/login`, user)
      .pipe(
        // pull something from stream
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }
        )
      )
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
