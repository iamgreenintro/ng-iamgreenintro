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
  data: T;
}

@Injectable({ providedIn: 'root' })
export class InMemoryCachingService {
  // Our Map key will be the actual function itself.
  private cache: Map<Symbol, BehaviorSubject<CachedDataType<any> | null>> = new Map<
    Symbol,
    BehaviorSubject<CachedDataType<any> | null>
  >(null);

  constructor() {}

  /**
   * Method that gets invoked by the service method calling the API for data.
   * @param key
   * @param fetchFn
   * @param forceRefresh
   * @returns
   */
  public getData<T>(
    key: Symbol,
    fetchFn: () => Observable<T>,
    forceRefresh = false
  ): Observable<T> {
    // If there is no entry existing in the cache OR the request was explicitly told to be made:
    if (!this.cache.has(key) || forceRefresh) {
      this.cache.set(key, new BehaviorSubject<CachedDataType<T> | null>(null));
      fetchFn()
        .pipe(
          tap((data) => {
            const cachedData: CachedDataType<T> = {
              lastCachedAt: moment(),
              data,
            };
            this.cache.get(key)!.next(cachedData);
          }),
          shareReplay(1)
        )
        .subscribe();
    }
    return this.cache
      .get(key)!
      .asObservable()
      .pipe(
        switchMap((data) =>
          data
            ? of(data.data)
            : fetchFn().pipe(
                tap((res) => {
                  const cachedData: CachedDataType<T> = {
                    lastCachedAt: moment(),
                    data: res,
                  };
                  this.cache.get(key)!.next(cachedData);
                })
              )
        )
      );
  }

  private clearCache(key: Symbol): void {
    this.cache.delete(key);
  }
}
