import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Gifts } from './components/gifts/gifts';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Gifts],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('client');
}