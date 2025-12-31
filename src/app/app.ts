import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Gifts } from './components/Gift/gifts/gifts';
import { Donors } from './components/Donor/donors/donors';
import { Lottery } from './components/lottery/lottery';
import { Auth } from './components/auth/auth';
import { AddGift } from './components/Gift/add-gift/add-gift';
import { AddDonor } from './components/Donor/add-donor/add-donor';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Gifts, Donors, Lottery, Auth,AddGift,AddDonor],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client');
}