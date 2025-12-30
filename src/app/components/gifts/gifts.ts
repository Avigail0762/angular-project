import { Component, inject } from '@angular/core';
import { GiftsService } from '../../services/gifts-service';
import { Gift } from '../../models/giftModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GiftDTO } from '../../models/Dto/giftDto';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-gifts',
  imports: [FormsModule, CommonModule],
  templateUrl: './gifts.html',
  styleUrl: './gifts.scss'
})
export class Gifts {

  giftsSrv: GiftsService = inject(GiftsService)

  gifts$ = this.giftsSrv.getAll();
  gift$?: Observable<GiftDTO>;

  getAll(){
    this.gifts$ = this.giftsSrv.getAll();
  }
  getById(id: number){
  this.gift$ = this.giftsSrv.geById(id);
  }
  update(item: GiftDTO, id: number){
    this.giftsSrv.update(item, id).subscribe(data =>{
      this.gifts$ = this.giftsSrv.getAll();
    })
  }
  add(item: GiftDTO | undefined){
      if (item) {
        this.giftsSrv.add(item).subscribe(data => {
          this.gifts$ = this.giftsSrv.getAll();
        });
      }
    }

  delete(id: number){
    this.giftsSrv.delete(id).subscribe(data =>{
      this.gifts$ = this.giftsSrv.getAll();
    })
  }

}