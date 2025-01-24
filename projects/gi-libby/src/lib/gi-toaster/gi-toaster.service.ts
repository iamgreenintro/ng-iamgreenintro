import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiToasterService {
  public $toasters: BehaviorSubject<any> = new BehaviorSubject([]);
  public toasterList: any[] = [];
  constructor() {}

  public addToaster(toaster: any): void {
    this.toasterList.push(toaster);
    this.$toasters.next(this.toasterList);
  }
}
