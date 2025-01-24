import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GiDraggableDirective } from 'gi-libby';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GiDraggableDirective],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'demo';
  items: string[] = ['test1', 'test2', 'test3'];
}
