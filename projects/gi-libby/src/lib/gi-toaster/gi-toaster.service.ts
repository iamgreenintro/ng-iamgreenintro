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
    if (toaster.autoClose) {
      setTimeout(() => this._initiateAutoClose(toaster), 120000);
    }
  }

  private _initiateAutoClose(toaster: ToasterItem): void {
    this.toasterList.splice(this.toasterList.indexOf(toaster), 1);
    this.$toasters.next(this.toasterList);
  }
}
