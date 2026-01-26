import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DonorService } from '../../../services/donor-service';
import { Donor } from '../../../models/donorModel';
import { DonorDTO } from '../../../models/Dto/donorDto';

@Component({
  selector: 'app-donors',
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './donors.html',
  styleUrl: './donors.scss'
})
export class Donors {
  donorSrv: DonorService = inject(DonorService)
  donors$ = this.donorSrv.getAll();
  donor = new Donor();  

    getAll(){
      this.donors$ = this.donorSrv.getAll();
    }
    geByName(firstName: string, lastName: string){
      this.donorSrv.geByName(firstName, lastName).subscribe(data =>{
        this.donor = data;
      })
    }
    update(item: DonorDTO, id: number){
      this.donorSrv.update(item, id).subscribe(data =>{
        this.donors$ = this.donorSrv.getAll();
      })
    }
    add(item: DonorDTO | undefined){
        if (item) {
          this.donorSrv.add(item).subscribe(data => {
            this.donors$ = this.donorSrv.getAll();
          });
        }
      }
  
    delete(id: number){
      this.donorSrv.delete(id).subscribe(data =>{
        this.donors$ = this.donorSrv.getAll();
      })
    }

}
