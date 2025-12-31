import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LotteryService } from '../../services/lottery-service';
import { GiftsService } from '../../services/gifts-service';

@Component({
  selector: 'app-lottery',
  imports: [FormsModule,CommonModule],
  templateUrl: './lottery.html',
  styleUrl: './lottery.scss',
})
export class Lottery {
  giftsSrv: GiftsService = inject(GiftsService)
  lotterySrv = inject(LotteryService);
  gifts$ = this.giftsSrv.getAll();
  
    getAll(){
      this.gifts$ = this.giftsSrv.getAll();
    }
  
  draw(giftId: number) {
    this.lotterySrv.draw(giftId).subscribe((data) => {
      console.log('Drawn Ticket:', data);
    });
  }

  // getWinners() {
  //   this.lotterySrv.getWinners().subscribe((data) => {
  //     console.log('Winners:', data);
  //   });
  // }
  // getTotalIncome() {
  //   this.lotterySrv.getTotalIncome().subscribe((data) => {
  //     console.log('Total Income:', data);
  //   }); 
  // }

}
