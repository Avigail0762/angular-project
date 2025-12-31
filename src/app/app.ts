import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Gifts } from './components/Gift/gifts/gifts';
import { Donors } from './components/Donor/donors/donors';
import { Lottery } from './components/lottery/lottery';
import { Auth } from './components/auth/auth';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Gifts, Donors, Lottery, Auth],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client');
}