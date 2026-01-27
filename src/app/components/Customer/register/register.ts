import { Component, inject } from '@angular/core';
import { UserDTO } from '../../../models/Dto/userDto';
import { CustomerService } from '../../../services/customer-service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {

  customerService = inject(CustomerService);
  router = inject(Router);

  user: UserDTO = {
    username: '',
    phone: '',
    email: '',
    password: ''
  };

  loading = false;

  register() {
    if (!this.user.username || !this.user.email || !this.user.password) {
      alert('נא למלא שם משתמש, אימייל וסיסמה');
      return;
    }
    this.loading = true;
    this.customerService.registerCustomer(this.user).subscribe({
      next: () => {
        alert('ההרשמה הצליחה! עוברים למסך התחברות...');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        alert('שגיאה בהרשמה: ' + (err?.error?.message || err.message || 'אירעה תקלה'));
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }


}
