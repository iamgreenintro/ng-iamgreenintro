import { Routes } from '@angular/router';
import { ExampleGiDraggableComponent } from './gi-draggable/gi-draggable.component';
import { ExampleGiToasterComponent } from './gi-toaster/example-gi-toaster.component';

export const routes: Routes = [
  { path: 'gi-draggable', component: ExampleGiDraggableComponent },
  { path: 'gi-toaster', component: ExampleGiToasterComponent },
];
