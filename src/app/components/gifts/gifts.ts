import { Component, inject } from '@angular/core';
import { GiftsService } from '../../services/gifts-service';

@Component({
  selector: 'app-gifts',
  imports: [],
  templateUrl: './gifts.html',
  styleUrl: './gifts.scss'
})
export class Gifts {

  giftsSrv: GiftsService = inject(GiftsService)
  gifts$ = this.giftsSrv.getAll();

  getAll(){
  }
  geById(){
  }
  update(){
  }
  add(){
  }
  delete(){
  }

}