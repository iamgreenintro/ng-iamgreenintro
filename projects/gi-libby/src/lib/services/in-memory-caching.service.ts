/**
 * @description
 * An in-memory caching service that acts as a wrapper for data retrieval via methods that return Observables.
 * For example when using Angular's HttpClient, the requests can return an Observable.
 * To limit (frequent) requests we can cache the fetched data in a custom CacheMap type.
 */

import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, Observable, shareReplay, tap } from 'rxjs';
import moment from 'moment';

export interface CachedDataType<T> {
  lastCachedAt: moment.Moment | undefined;
  data: T | undefined;
}

interface CacheMap extends Map<Symbol, BehaviorSubject<CachedDataType<any>>> {}

@Injectable({ providedIn: 'root' })
export class InMemoryCachingService {
  private cache: CacheMap = new Map<Symbol, BehaviorSubject<CachedDataType<any>>>();

  constructor() {}

  /**
   * Lookup and return from CacheMap
   * @param symbol unique symbol passed in the context the InMemoryCachingService is injected to.
   * @param observableReturnFn callback function that returns an Observable.
   * @param duration duration in seconds before updating.
   * @param forceRefresh forcefully update the value in cache.
   * @returns
   */
  public returnFromCacheMapAsObservable<T>(
    symbol: Symbol,
    observableReturnFn: () => Observable<T>,
    duration: number = 3600,
    forceRefresh = false
  ): Observable<CachedDataType<T>> {
    // Get the progressed time in seconds:
    const progressedTime = moment().diff(
      this.cache.get(symbol)?.getValue().lastCachedAt,
      'seconds'
    );

    // Create or update an entry in the CacheMap:
    if (!this.cache.has(symbol) || forceRefresh || progressedTime > duration) {
      this.cache.set(
        symbol,
        new BehaviorSubject<CachedDataType<T>>({
          lastCachedAt: undefined,
          data: undefined,
        })
      );

      // Execute the callback function update the CacheMap BehaviourSubject with the callback result:
      observableReturnFn()
        .pipe(
          tap((data) => {
            // Inside the CacheMap we update the BehaviourSubject's value:
            const cachedData: CachedDataType<T> = {
              lastCachedAt: moment(),
              data: data,
            };
            this.cache.get(symbol)?.next(cachedData);
          }),
          shareReplay(1)
        )
        .subscribe();
    }

    // Get the cached value (the BehaviourSubject) and return it as an Observable (Observable<CachedDataType<T>>)
    return this.cache
      .get(symbol)!
      .asObservable()
      .pipe(
        // Filter out initial values
        filter((cachedData) => typeof cachedData.data !== 'undefined')
      );
  }

  private clearCache(symbol: Symbol): void {
    this.cache.delete(symbol);
  }
}
