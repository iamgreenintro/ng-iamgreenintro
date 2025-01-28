import { Component } from '@angular/core';
import { GiDraggableDirective } from 'gi-libby';

@Component({
  selector: 'example-gi-draggable',
  imports: [GiDraggableDirective],
  templateUrl: './gi-draggable.component.html',
  styleUrl: './gi-draggable.component.scss',
})
export class ExampleGiDraggableComponent {
  items: string[] = ['test1', 'test2', 'test3'];
}
