import { Component, inject } from '@angular/core';
import { GiftsService } from '../../services/gifts-service';
import { Gift } from '../../models/giftModel';

@Component({
  selector: 'app-gifts',
  imports: [],
  templateUrl: './gifts.html',
  styleUrl: './gifts.scss'
})
export class Gifts {

  giftsSrv: GiftsService = inject(GiftsService)
  gifts$ = this.giftsSrv.getAll();

  geById(id: number){
    return this.giftsSrv.geById(id);
  }
  update(item: Gift, id: number){
    if (item) {
      this.giftsSrv.update(id, item).subscribe(data => {
        this.gifts$ = this.giftsSrv.getAll();
      });
    }
  }
  add(item: Gift | undefined){
    if (item) {
      this.giftsSrv.add(item).subscribe(data => {
        this.gifts$ = this.giftsSrv.getAll();
      });
    }
  }
  delete(id: number){
    this.giftsSrv.delete(id).subscribe(d => {
      this.gifts$ = this.giftsSrv.getAll();
    });
  }

}