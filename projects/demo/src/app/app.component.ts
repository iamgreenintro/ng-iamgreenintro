import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GiToasterComponent } from 'gi-libby';
import { GiToasterService } from 'gi-libby';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GiToasterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'demo';
  toasters: any[] = [];

  constructor(private toasterService: GiToasterService) {}

  ngOnInit(): void {
    this.toasterService.$toasters.subscribe((result) => {
      this.toasters = result;
    });
  }

  onAddClick(): void {
    this.toasterService.addToaster({
      title: 'Toaster Title ' + Math.random().toFixed(5),
      type: 'success',
      autoClose: true,
    });
  }
}
