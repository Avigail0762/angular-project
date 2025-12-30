import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-auth',
  imports: [CommonModule, FormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  authSrv: AuthService = inject(AuthService)

  password = '';
  username = '';

  login(username: string, password: string) {
      this.authSrv.login(username, password);
  }
  
}
