import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
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

  async getSomething() {
    return this.cachingService.getData(
      ApiService.something,
      () => of(this.somethingText + `${this.incrementer}`),
      true
    );
  }

  async setSomething() {
    this.somethingText = 'something';
    this.incrementer += 1;
    return this.somethingText + `${this.incrementer}`;
  }

  async getSomethingElse() {
    return this.cachingService.getData(
      ApiService.somethingElse,
      () => of(['1', this.incrementer, { key: 'value' }]),
      false
    );
  }
}
