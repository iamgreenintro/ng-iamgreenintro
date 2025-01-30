import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToasterItem } from './types';

@Injectable({
  providedIn: 'root',
})
export class GiToastService {
  public $toasters: BehaviorSubject<any[]> = new BehaviorSubject(new Array());
  public toastList: ToasterItem[] = [];
  constructor() {}

  public addToast(toast: ToasterItem): void {
    this.toastList.push(toast);
    this.$toasters.next(this.toastList);
  }

  public removeToast(toast: ToasterItem): void {
    const toastIndex: number = this.toastList.indexOf(toast);
    this.toastList.splice(toastIndex, 1);
    this.$toasters.next(this.toastList);
  }

  // private _initiateAutoClose(toaster: ToasterItem): void {
  //   this.toasterList.splice(this.toasterList.indexOf(toaster), 1);
  //   this.$toasters.next(this.toasterList);
  // }
}
