import { Routes } from '@angular/router';
import { ExampleGiDraggableComponent } from './gi-draggable/gi-draggable.component';
import { ExampleGiToastComponent } from './gi-toast/example-gi-toast.component';
import { ExampleGiCachingComponent } from './gi-caching/example-gi-caching.component';

export const routes: Routes = [
  { path: 'gi-draggable', component: ExampleGiDraggableComponent },
  { path: 'gi-toast', component: ExampleGiToastComponent },
  { path: 'gi-caching', component: ExampleGiCachingComponent },
];
