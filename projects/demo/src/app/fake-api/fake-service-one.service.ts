import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { InMemoryCachingService } from 'gi-libby';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class FakeServiceOne {
  // Constants for Symbols as they are always unique if new instances.
  private static readonly getIncrementCountValue = Symbol('getIncrementCountValue');
  private static readonly getSomeData = Symbol('getSomeData');

  private incrementCount: number = 0;

  constructor(private http: HttpClient, private cachingService: InMemoryCachingService) {}

  async getIncrementCountValue(forceRefresh = false) {
    return this.cachingService.returnFromCacheMapAsObservable(
      FakeServiceOne.getIncrementCountValue,
      () => this.http.get(`https://jsonplaceholder.typicode.com/todos/${this.incrementCount + 1}`),
      5,
      forceRefresh
    );
  }

  async getSomeData(forceRefresh = false) {
    return this.cachingService.returnFromCacheMapAsObservable(
      FakeServiceOne.getSomeData,
      () => of([this.incrementCount, { key: this.incrementCount }]),
      15,
      forceRefresh
    );
  }

  public incrementCounter(): void {
    this.incrementCount += 1;
  }
}
