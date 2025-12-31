import { Component, inject, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { GiftDTO } from '../../../models/Dto/giftDto';
import { GiftsService } from '../../../services/gifts-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-gift',
  imports: [],
  templateUrl: './add-gift.html',
  styleUrl: './add-gift.scss',
})
export class AddGift {
  giftsSrv: GiftsService = inject(GiftsService)
  gifts$ = this.giftsSrv.getAll();
  gift$?: Observable<GiftDTO>;
  @Input()
  giftId: number = -1;

  giftForm: FormGroup = new FormGroup({});


  

  getAll(){
    this.gifts$ = this.giftsSrv.getAll();
  }

  add(item: GiftDTO | undefined){
      if (item) {
        this.giftsSrv.add(item).subscribe(data => {
          this.gifts$ = this.giftsSrv.getAll();
        });
      }
    }


}
