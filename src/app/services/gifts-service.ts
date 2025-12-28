import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Gift } from '../models/giftModel';


@Injectable({
  providedIn: 'root'
})

export class GiftsService {
  httpClient: HttpClient = inject(HttpClient);
  BASE_URL: string = 'http://localhost:7253/api/gift';
  
  getAll(){
    return this.httpClient.get<Gift[]>(this.BASE_URL);
  }

  geById(id: number){
    return this.httpClient.get<Gift>(this.BASE_URL+'/'+id);
  }
  update(id:number, gift: Gift){
    return this.httpClient.put<Gift>(this.BASE_URL+'/'+id, gift);
  }
  add(gift: Gift){
    return this.httpClient.post<Gift>(this.BASE_URL, gift);
  }
  delete(id: number){
    return this.httpClient.delete<void>(this.BASE_URL + '?id=' + id);
  }
  
}