import { Component, inject } from '@angular/core';
import { DonorService } from '../../../services/donor-service';
import { Observable } from 'rxjs';
import { DonorDTO } from '../../../models/Dto/donorDto';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-donor',
  imports: [],
  templateUrl: './add-donor.html',
  styleUrl: './add-donor.scss',
})
export class AddDonor {

  donorSrv: DonorService = inject(DonorService);

  donor$ =  Observable<DonorDTO>;
  donorForm: FormGroup = new FormGroup({});

  add(item: DonorDTO | undefined){
      if (item) {
        this.donorSrv.add(item).subscribe();
      }
    }
}
