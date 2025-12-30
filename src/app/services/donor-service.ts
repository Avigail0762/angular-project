import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Donor } from '../models/donorModel';
import { DonorDTO } from '../models/Dto/donorDto';

@Injectable({
  providedIn: 'root'
})
export class DonorService {
      httpClient: HttpClient = inject(HttpClient);
      BASE_URL: string = 'https://localhost:7253/api/donor';
    
    getAll(){
       return this.httpClient.get<Donor[]>(this.BASE_URL);
    }
    geByName(firstName: string, lastName: string){
      return this.httpClient.get<Donor>(this.BASE_URL + '/'+ firstName + '/' + lastName);
    }
    update(item: DonorDTO, id:number){
          return this.httpClient.put<DonorDTO>(this.BASE_URL, item + '/'+ id);
    }
    add(item: DonorDTO){
  
      return this.httpClient.post<DonorDTO>(this.BASE_URL, item);
    }
    delete(id: number){
      return this.httpClient.delete<void>(this.BASE_URL+ '?id=' + id)
    }
  
}
