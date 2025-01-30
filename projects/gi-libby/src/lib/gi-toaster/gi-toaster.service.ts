import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToasterItem } from './types';

@Injectable({
  providedIn: 'root',
})
export class GiToasterService {
  public $toasters: BehaviorSubject<any[]> = new BehaviorSubject(new Array());
  public toasterList: ToasterItem[] = [];
  constructor() {}

  public addToaster(toaster: ToasterItem): void {
    this.toasterList.push(toaster);
    this.$toasters.next(this.toasterList);
  }

  public removeToaster(toaster: ToasterItem): void {
    const toasterIndex: number = this.toasterList.indexOf(toaster);
    this.toasterList.splice(toasterIndex, 1);
    this.$toasters.next(this.toasterList);
  }

  // private _initiateAutoClose(toaster: ToasterItem): void {
  //   this.toasterList.splice(this.toasterList.indexOf(toaster), 1);
  //   this.$toasters.next(this.toasterList);
  // }
}
