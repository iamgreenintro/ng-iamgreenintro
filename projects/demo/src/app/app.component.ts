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
  items: any[] = [];

  constructor(private toasterService: GiToasterService) {}

  ngOnInit(): void {
    console.log(this.items);
    for (let index = 0; index < 3; index++) {
      this.toasterService.addToaster({
        title: 'Toaster Title ' + index,
        type: 'success',
        autoClose: false,
      });
    }

    this.toasterService.$toasters.subscribe((result) => {
      console.log('added');
      this.items = result;
    });
  }

  onCloseClick(): void {
    console.log('closed');
  }

  onAddClick(): void {
    this.toasterService.addToaster({
      title: 'Toaster Title ' + 999,
      type: 'success',
      autoClose: false,
    });
  }
}
