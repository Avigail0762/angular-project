import { Component, inject } from '@angular/core';
import { GiftsService } from '../../../services/gifts-service';
import { Gift } from '../../../models/giftModel';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { GiftDTO } from '../../../models/Dto/giftDto';
import { AuthService } from '../../../services/auth-service';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../../../services/customer-service';

@Component({
  selector: 'app-gifts',
  imports: [FormsModule, CommonModule, RouterOutlet],
  templateUrl: './gifts.html',
  styleUrl: './gifts.scss'
})
export class Gifts {

  giftsSrv: GiftsService = inject(GiftsService)
  auth = inject(AuthService);
  customerSrv = inject(CustomerService);

  gifts$ = this.giftsSrv.getAll();
  gift$?: Observable<GiftDTO>;

  router = inject(Router);
  activateRoute = inject(ActivatedRoute);

  // מאפיין נוח לתבנית: האם המשתמש מנהל
  get isManager(){
    return this.auth.isManager();
  }

  addGift(){
    // Navigate to the child route under /gifts
    this.router.navigate(['add'], { relativeTo: this.activateRoute });
  }

  updateGift(id: number){
    this.router.navigate(['update', id], { relativeTo: this.activateRoute });
  }

  addToCart(giftId: number){
    this.customerSrv.addToCartForCurrentUser(giftId).subscribe();
    alert(`Gift with ID ${giftId} added to cart!`);
  }

  getAll(){
    this.gifts$ = this.giftsSrv.getAll();
  }
  getById(id: number){
  this.gift$ = this.giftsSrv.getById(id);
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