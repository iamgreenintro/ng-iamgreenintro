import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiToasterService {
  public $toasters: BehaviorSubject<any[]> = new BehaviorSubject(new Array());
  public toasterList: any[] = [];
  constructor() {}

  public addToaster(toaster: any): void {
    this.toasterList.push(toaster);
    this.$toasters.next(this.toasterList);
    if (toaster.autoClose) {
      setTimeout(() => this._initiateAutoClose(toaster), 5000);
    }
  }

  private _initiateAutoClose(toaster: any): void {
    this.toasterList.splice(this.toasterList.indexOf(toaster), 1);
    this.$toasters.next(this.toasterList);
  }
}
