import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GiftDTO } from '../../../models/Dto/giftDto';
import { GiftsService } from '../../../services/gifts-service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-gift',
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './add-gift.html',
  styleUrl: './add-gift.scss',
})
export class AddGift {
  giftsSrv: GiftsService = inject(GiftsService)

  giftForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(10)]),
    description: new FormControl(''),
    donorId: new FormControl(0, [Validators.required, Validators.min(1)]),
    category: new FormControl('')
  });
 
  addGift() {
    if (this.giftForm.invalid) return;

    const gift: GiftDTO = this.giftForm.value;
      this.giftsSrv.add(gift).subscribe() ;
      //add navigate to gifts list
  }

  cancel() {
    this.giftForm.reset();
  }

}
