import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  httpClient: HttpClient = inject(HttpClient);
  BASE_URL: string = 'https://localhost:7253/api/auth';

  login(username: string, password: string) {
    this.httpClient.post<{ token: string }>(this.BASE_URL + '/login', { username, password })
      .subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token);
          alert('ההתחברות הצליחה!');
        },
        error: (err) => {
          alert('שגיאה בהתחברות: ' + err.message);
        }
      });
  }
}

