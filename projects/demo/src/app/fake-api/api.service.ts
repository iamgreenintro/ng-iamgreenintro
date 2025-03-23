import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { InMemoryCachingService } from 'gi-libby';
@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // Constants for Symbols as they are always unique if new instances.
  private static readonly something = Symbol('getSomething');
  private static readonly somethingElse = Symbol('getSomethingElse');

  private somethingText: string = 'something';
  private incrementer: number = 0;

  constructor(private cachingService: InMemoryCachingService) {}

  async getSomething(forceRefresh = false) {
    return this.cachingService.getData(
      ApiService.something,
      () => of(this.somethingText + `${this.incrementer}`),
      30,
      forceRefresh
    );
  }

  setSomething() {
    this.incrementer += 1;
  }

  async getSomethingElse(forceRefresh = false) {
    return this.cachingService.getData(
      ApiService.somethingElse,
      () => of({ arr: [{ test: `test #${this.incrementer}` }] }),
      60,
      forceRefresh
    );
  }
}
