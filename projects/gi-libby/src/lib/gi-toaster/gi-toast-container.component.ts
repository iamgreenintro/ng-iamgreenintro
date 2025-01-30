import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToasterItem } from './types';
import { GiToastService } from './gi-toast.service';

@Component({
  selector: 'gi-toast-container',
  imports: [CommonModule],
  templateUrl: './gi-toast-container.component.html',
  styleUrl: './gi-toast-container.component.scss',
})
export class GiToastContainerComponent implements OnInit {
  // Input properties (and if applicable their (initial) default values):
  @Input() toastItems: ToasterItem[] = [];
  @Input() maxToastItems: number = 4;
  @Input() toastDurationInMs: number = 5000;

  // Output EventEmitters:
  @Output('close') closeEvent = new EventEmitter();
  @Output('toastListChange') toasteListChangeEvent = new EventEmitter();

  constructor(private toastService: GiToastService) {}

  ngOnInit(): void {
    this.toastService.$toasters.subscribe((toasters) => {
      this._onToasterListChange(toasters);
    });
  }

  public close(toastItem: ToasterItem): void {
    if (toastItem.closeRef !== undefined) {
      window.clearTimeout(toastItem.closeRef);
    }
    this.toastService.removeToast(toastItem);
    this.closeEvent.emit();
  }

  private _onToasterListChange(toastList: ToasterItem[]): void {
    this._closeFirstIfExceededMaxAmount(toastList);

    const toaster: ToasterItem = toastList[toastList.length - 1];
    if (this._hasAutoClose(toaster)) {
      if (toaster.closeRef === undefined) {
        toaster.closeRef = window.setTimeout(() => {
          this.close(toaster);
        }, this.toastDurationInMs);
      }
    }

    this.toasteListChangeEvent.emit('changed!');
  }

  private _closeFirstIfExceededMaxAmount(toastList: ToasterItem[]): void {
    if (toastList.length > this.maxToastItems) {
      this._removeTimeoutReferenceIfSet(toastList[0]);
      this.close(toastList[0]);
    }
  }

  private _removeTimeoutReferenceIfSet(toast: ToasterItem): void {
    if (toast.closeRef !== undefined) {
      window.clearTimeout(toast.closeRef);
    }
  }

  private _hasAutoClose(toaster: ToasterItem): boolean {
    return toaster && toaster.autoClose ? true : false;
  }
}
