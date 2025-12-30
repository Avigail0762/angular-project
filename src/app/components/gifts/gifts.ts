import { Component, inject } from '@angular/core';
import { GiftsService } from '../../services/gifts-service';
import { Gift } from '../../models/giftModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GiftDTO } from '../../models/Dto/giftDto';

@Component({
  selector: 'app-gifts',
  imports: [FormsModule, CommonModule],
  templateUrl: './gifts.html',
  styleUrl: './gifts.scss'
})
export class Gifts {

  giftsSrv: GiftsService = inject(GiftsService)

  gifts$ = this.giftsSrv.getAll();
  gift = new Gift();

  getAll(){
    this.gifts$ = this.giftsSrv.getAll();
  }
  getById(id: number){
    this.giftsSrv.getById(id).subscribe(data =>{
      this.gift = data;
    })
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