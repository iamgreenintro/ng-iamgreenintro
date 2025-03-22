/**
 * An in-memory caching service to be extended to other services that fire requests that return data.
 * It's intent is to be able to limit data retrieval when possible such as navigating through a SPA.
 * Different pages might do the same request to render the data; instead we can just retrieve
 * the previously fetched data if it's "new" enough.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, shareReplay, switchMap, tap } from 'rxjs';
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
   * @param forceRefresh forcefully update subscribers.
   * @returns
   */
  public getData<T>(
    symbol: Symbol,
    observableReturnFn: () => Observable<T>,
    duration: number = 10,
    forceRefresh = false
  ): Observable<CachedDataType<T>> {
    // console.log(this.cache);
    // If there is no entry existing in the cache OR the request was explicitly told to be made:
    const progressedTime = moment().diff(
      this.cache.get(symbol)?.getValue().lastCachedAt,
      'seconds'
    );
    if (!this.cache.has(symbol) || forceRefresh || progressedTime > duration) {
      this.cache.set(
        symbol,
        new BehaviorSubject<CachedDataType<T>>({
          lastCachedAt: undefined,
          data: null,
        })
      );
      observableReturnFn()
        .pipe(
          tap((data) => {
            const cachedData: CachedDataType<T> = {
              lastCachedAt: moment(),
              data,
            };
            this.cache.get(symbol)!.next(cachedData);
          }),
          shareReplay(1)
        )
        .subscribe();
    }
    return this.cache
      .get(symbol)!
      .asObservable()
      .pipe(switchMap((data) => of(data)));
  }

  private clearCache(symbol: Symbol): void {
    this.cache.delete(symbol);
  }
}
