/**
 * An in-memory caching service to be extended to other services that fire requests that return data.
 * It's intent is to be able to limit data retrieval when possible such as navigating through a SPA.
 * Different pages might do the same request to render the data; instead we can just retrieve
 * the previously fetched data if it's "new" enough.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, shareReplay, tap } from 'rxjs';
import moment from 'moment';

export interface CachedDataType<T> {
  lastCachedAt: moment.Moment | undefined;
  data: T | null;
}

interface CacheMap extends Map<Symbol, BehaviorSubject<CachedDataType<any>>> {}

@Injectable({ providedIn: 'root' })
export class InMemoryCachingService {
  private cache: CacheMap = new Map<Symbol, BehaviorSubject<CachedDataType<any>>>();

  constructor() {}

  /**
   * Method that gets invoked by the service method calling the API for data.
   * @param symbol should be a unique symbol passed in the context this service is injected to.
   * @param observableReturnFn callback function that should return an Observable of type CachedDataType<T>.
   * @param duration the duration in seconds that the cached data is valid for, defaults to 3600 (1hr).
   * @param forceRefresh forcefully update; defaults to false.
   * @returns
   */
  public getData<T>(
    symbol: Symbol,
    observableReturnFn: () => Observable<T>,
    duration: number = 3600,
    forceRefresh = false
  ): Observable<CachedDataType<T>> {
    // console.log(this.cache);
    const progressedTime = moment().diff(
      this.cache.get(symbol)?.getValue().lastCachedAt,
      'seconds'
    );
    // Symbol does not exist OR we want to force a callback execution OR cache duration has expired:
    if (!this.cache.has(symbol) || forceRefresh || progressedTime > duration) {
      this.cache.set(
        symbol,
        new BehaviorSubject<CachedDataType<T>>({
          lastCachedAt: undefined,
          data: null,
        })
      );
      // Call the logic from the callback fn that does stuff and returns an Observable.
      observableReturnFn()
        .pipe(
          tap((data) => {
            const cachedData: CachedDataType<T> = {
              lastCachedAt: moment(),
              data: data,
            };
            this.cache.get(symbol)!.next(cachedData);
          }),
          shareReplay(1)
        )
        .subscribe();
    }
    // Get the cached value and return it as an Observable (Observable<CachedDataType<T>>)
    return this.cache.get(symbol)!.asObservable();
  }

  private clearCache(symbol: Symbol): void {
    this.cache.delete(symbol);
  }
}
