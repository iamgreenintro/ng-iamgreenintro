import { Component } from '@angular/core';
import { ApiService } from '../fake-api/api.service';
import { map } from 'rxjs';
import { FakeServiceOne } from '../fake-api/fake-service-one.service';

@Component({
  selector: 'app-gi-caching',
  imports: [],
  templateUrl: './example-gi-caching.component.html',
  styleUrl: './example-gi-caching.component.scss',
})
export class ExampleGiCachingComponent {
  constructor(private apiService: ApiService, private fakeServiceOne: FakeServiceOne) {}

  async getSomething(): Promise<void> {
    const something = await this.apiService.getSomething();
    something.subscribe((response) => {
      console.log(response);
    });
  }

  async getSomethingElse(): Promise<void> {
    const somethingElse = await this.apiService.getSomethingElse();
    somethingElse
      .pipe(
        map((data) => {
          // Transform if needed and return:
          return data;
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  async setSomething(): Promise<void> {
    this.apiService.setSomething();
  }

  async getIncrementCountValue(force: boolean = false): Promise<void> {
    const something = await this.fakeServiceOne.getIncrementCountValue(force);
    something.subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  async getSomeData(force: boolean = false): Promise<void> {
    const somethingElse = await this.fakeServiceOne.getSomeData(force);
    somethingElse
      .pipe(
        map((data) => {
          // Transform if needed and return:
          return data;
        })
      )
      .subscribe({
        next: (res) => {
          console.log(res);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }

  async incrementCounter(): Promise<void> {
    this.fakeServiceOne.incrementCounter();
  }
}
