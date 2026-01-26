import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
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
  router = inject(Router)
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
    delete(id: number){
      this.donorSrv.delete(id).subscribe(data =>{
        this.donors$ = this.donorSrv.getAll();
      })
    }
    addDonor(){
    this.router.navigate(['/donors/add']);
  }

    updateDonor(firstName: string, lastName: string){
  this.router.navigate(['/donors/update', firstName, lastName]);
  }

}
