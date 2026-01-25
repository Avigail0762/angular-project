import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  httpClient: HttpClient = inject(HttpClient);
  BASE_URL: string = 'https://localhost:7253/api/auth';

  isLoggedIn: boolean = false;
  
  login(username: string, password: string) {
    this.httpClient.post<{ token: string }>(this.BASE_URL + '/login', { username, password })
      .subscribe({
        next: (response) => {
          localStorage.setItem('authToken', response.token);
          // שמירת התפקיד גם בלוקאל סטורֵיג' לנגישות מהירה
          const role = this.getRole();
          localStorage.setItem('role', role);
            // שמירת מזהה המשתמש אם קיים בטוקן
          const uid = this.getUserId();
          if (uid !== null) {
            localStorage.setItem('userId', String(uid));
          }
          // Notify app to refresh role immediately
          window.dispatchEvent(new CustomEvent('authTokenUpdated'));
          alert('ההתחברות הצליחה!');
          this.isLoggedIn = true;
        },
        error: (err) => {
          this.isLoggedIn = false;
          alert('שגיאה בהתחברות: ' + err.message);
        }
      });
  }

  // קבלת תפקיד מהטוקן ללא שכפול לוגיקה בקומפוננטות
  getRole(): 'manager' | 'user' | 'userWithoutToken' {
    const token = localStorage.getItem('authToken');
    if (!token) return 'userWithoutToken';
    try {
      const decoded: any = jwtDecode(token);
      const keys = [
        'Role',
        'role',
        'roles',
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/role'
      ];
      let role: string | null = null;
      for (const key of keys) {
        const val = decoded?.[key];
        if (Array.isArray(val) && val.length) { role = String(val[0]); break; }
        if (typeof val === 'string' && val) { role = val; break; }
      }
      role = (role ?? '').toLowerCase();
      return role === 'manager' ? 'manager' : 'user';
    } catch {
      return 'user';
    }
  }

  isManager(): boolean { return this.getRole() === 'manager'; }

  // קריאה מהירה לערך שנשמר בלוקאל סטורֵיג' (עם נפילה חזרה לפענוח)
  getStoredRole(): 'manager' | 'user' | 'userWithoutToken' {
    const stored = localStorage.getItem('role');
    if (stored === 'manager' || stored === 'user') return stored;
    return this.getRole();
  }

  // חילוץ userId מהטוקן
  getUserId(): number | null {
    const token = localStorage.getItem('authToken');
    if (!token) return null;
    try {
      const decoded: any = jwtDecode(token);
      const keys = [
        'sub',
        'nameid',
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ];
      for (const key of keys) {
        const val = decoded?.[key];
        if (val !== undefined && val !== null) {
          const num = Number(val);
          return Number.isFinite(num) ? num : null;
        }
      }
      return null;
    } catch {
      return null;
    }
  }

  // קריאה מהירה למזהה שנשמר בלוקאל סטורֵיג'
  getStoredUserId(): number | null {
    const stored = localStorage.getItem('userId');
    if (stored !== null) {
      const num = Number(stored);
      if (Number.isFinite(num)) return num;
    }
    return this.getUserId();
  }

  // האם יש טוקן תקף בלוקאל סטורֵיג'
  hasToken(): boolean {
    const token = localStorage.getItem('authToken');
    return !!token;
  }

  logout() {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    window.dispatchEvent(new CustomEvent('authTokenUpdated'));
    alert('התנתקת מהמערכת.');
  }
}

