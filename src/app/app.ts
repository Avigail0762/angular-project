import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Gifts } from './components/gifts/gifts';
import { Donors } from './components/donors/donors';
import { Lottery } from './components/lottery/lottery';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Gifts, Donors, Lottery],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client');
}