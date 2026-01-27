import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})

export class Auth {
  authSrv: AuthService = inject(AuthService)
  router = inject(Router);
  password = '';
  username = '';

// login(username: string, password: string) {
//       this.authSrv.login(username, password);
//       // לבדוק האם יש דרך טובה יותר לעשות את זה
//       // לבדוק האם הוא מחובר או לא
//        if (this.authSrv.isLoggedIn) {
//         alert('Login successful!');
//       }
//       else {
//         alert('Login failed. Navigating you to register.');
//         this.router.navigate(['/register']);
//       }
//   }

login(username: string, password: string) {
  this.authSrv.login(username, password).subscribe((ok) => {
    if (ok) {
      alert('Login successful!');
      // Navigate to a post-login page if desired
      // this.router.navigate(['/']);
    } else {
      alert('Login failed. Navigating you to register.');
      this.router.navigate(['/register']);
    }
  });
}
  
}
