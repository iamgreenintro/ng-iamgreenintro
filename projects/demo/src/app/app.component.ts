import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './fake-api/api.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'demo';

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {}

  async getSomething(): Promise<void> {
    const something = await this.apiService.getSomething();
    something.subscribe((response) => {
      console.log(response);
    });
  }

  async getSomethingElse(): Promise<void> {
    const somethingElse = await this.apiService.getSomethingElse();
    somethingElse.subscribe((response) => {
      console.log(response);
    });
  }

  async setSomething(): Promise<void> {
    this.apiService.setSomething();
  }
}
