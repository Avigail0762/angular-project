import { Component, inject } from '@angular/core';
import { DonorService } from '../../../services/donor-service';
import { Observable } from 'rxjs';
import { DonorDTO } from '../../../models/Dto/donorDto';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-donor',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-donor.html',
  styleUrl: './add-donor.scss',
})
export class AddDonor {

  donorSrv: DonorService = inject(DonorService);

  donorForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    phoneNumber: new FormControl('', [/*Validators.required,*/ Validators.minLength(10)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    address: new FormControl(''),
  });

  addDonor() {
    if (this.donorForm.invalid) return;

    const donor: DonorDTO = this.donorForm.value;
      this.donorSrv.add(donor).subscribe(); 
       }

  cancel() {
    this.donorForm.reset();
  }


}
