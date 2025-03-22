import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastItem } from './types';

@Injectable({
  providedIn: 'root',
})
export class GiToastService {
  public $toasts: BehaviorSubject<any[]> = new BehaviorSubject(new Array());
  public toastList: ToastItem[] = [];
  constructor() {}

  public addToast(toast: ToastItem): void {
    this.toastList.push(toast);
    this.$toasts.next(this.toastList);
  }

  public removeToast(toast: ToastItem): void {
    const toastIndex: number = this.toastList.indexOf(toast);
    this.toastList.splice(toastIndex, 1);
    this.$toasts.next(this.toastList);
  }
}
