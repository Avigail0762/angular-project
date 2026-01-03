import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { GiftsService } from '../../../services/gifts-service';
import { GiftDTO } from '../../../models/Dto/giftDto';

@Component({
  selector: 'app-update-gift',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-gift.html',
  styleUrl: './update-gift.scss',
})
export class UpdateGift {
    giftsSrv: GiftsService = inject(GiftsService)
    giftId!: number;
    gift?: GiftDTO;

    giftForm: FormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl(0, [Validators.required, Validators.min(10)]),
      description: new FormControl(''),
      donorId: new FormControl(0, Validators.required),
      category: new FormControl('')
    });

    updateGift() {
    if (!this.giftId || this.giftForm.invalid) return;
    
    const updatedGift: GiftDTO = {
      ...this.gift,
      ...this.giftForm.value
    };

      this.giftsSrv.update(updatedGift, this.giftId).subscribe();
    }
}
