import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Gift } from '../models/giftModel';
import { GiftDTO } from '../models/Dto/giftDto';

@Injectable({
  providedIn: 'root'
})

export class GiftsService {
    httpClient: HttpClient = inject(HttpClient);
    BASE_URL: string = 'https://localhost:7253/api/gift';
  
  getAll(){
     return this.httpClient.get<Gift[]>(this.BASE_URL);
  }
  getById(id:number){
    return this.httpClient.get<Gift>(this.BASE_URL + '/'+ id);
  }
  update(item: GiftDTO, id:number){
        return this.httpClient.put<GiftDTO>(this.BASE_URL, item + '/'+ id);
  }
  add(item: GiftDTO){

    return this.httpClient.post<GiftDTO>(this.BASE_URL, item);
  }
  delete(id: number){
    return this.httpClient.delete<void>(this.BASE_URL+ '?id=' + id)
  }
  
}