import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ticket } from '../models/ticketModel';

@Injectable({
  providedIn: 'root',
})
export class LotteryService {
  httpClient: HttpClient = inject(HttpClient);
  BASE_URL: string = 'https://localhost:7253/api/lottery';

  getAuthHeader() {
    const token = localStorage.getItem('authToken') || '';
    if (!token) {
      alert('אין טוקן תקף, מעביר להתחברות...');
      //להעביר להתחברות
      return;
    }
    const httpHeaders = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return httpHeaders;
  }

  draw(giftId: number) {
    return this.httpClient.post<Ticket>(this.BASE_URL + '/draw/' + giftId,giftId, { headers: this.getAuthHeader() });
  }
  getWinners() {
    return this.httpClient.get<Ticket[]>(this.BASE_URL + '/winners', { headers: this.getAuthHeader() });
  }
  getTotalIncome() {
    return this.httpClient.get<number>(this.BASE_URL + '/total-income', { headers: this.getAuthHeader() });
  }
}
