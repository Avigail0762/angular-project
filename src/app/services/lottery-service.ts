import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Ticket } from '../models/ticketModel';

@Injectable({
  providedIn: 'root',
})
export class LotteryService {
      httpClient: HttpClient = inject(HttpClient);
    BASE_URL: string = 'https://localhost:7253/api/lottery';
  
  draw(giftId: number) {
     return this.httpClient.post<Ticket>(this.BASE_URL + '/draw/'+ giftId, null);
  }
  getWinners(){
    return this.httpClient.get< Ticket[]>(this.BASE_URL + '/winners');
  }
  getTotalIncome(){
    return this.httpClient.get<number>(this.BASE_URL + '/total-income');
  }
}
