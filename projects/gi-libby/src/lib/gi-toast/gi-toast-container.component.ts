import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastItem } from './types';
import { GiToastService } from './gi-toast.service';

@Component({
  selector: 'gi-toast-container',
  imports: [CommonModule],
  templateUrl: './gi-toast-container.component.html',
  styleUrl: './gi-toast-container.component.scss',
})
export class GiToastContainerComponent implements OnInit {
  // Input properties (and if applicable their (initial) default values):
  @Input() toastItems: ToastItem[] = [];
  @Input() maxToastItems: number = 4;
  @Input() toastDurationInMs: number = 5000;

  // Output EventEmitters:
  @Output('close') closeEvent = new EventEmitter();
  @Output('toastListChange') toastListChangeEvent = new EventEmitter();

  constructor(private toastService: GiToastService) {}

  ngOnInit(): void {
    this.toastService.$toasts.subscribe((toasts) => {
      this._onToastListChange(toasts);
    });
  }

  public close(toastItem: ToastItem): void {
    if (toastItem.closeRef !== undefined) {
      window.clearTimeout(toastItem.closeRef);
    }
    this.toastService.removeToast(toastItem);
    this.closeEvent.emit();
  }

  private _onToastListChange(toastList: ToastItem[]): void {
    this._closeFirstIfExceededMaxAmount(toastList);

    const toast: ToastItem = toastList[toastList.length - 1];
    if (this._hasAutoClose(toast)) {
      if (toast.closeRef === undefined) {
        toast.closeRef = window.setTimeout(() => {
          this.close(toast);
        }, this.toastDurationInMs);
      }
    }

    this.toastListChangeEvent.emit('changed!');
  }

  private _closeFirstIfExceededMaxAmount(toastList: ToastItem[]): void {
    if (toastList.length > this.maxToastItems) {
      this._removeTimeoutReferenceIfSet(toastList[0]);
      this.close(toastList[0]);
    }
  }

  private _removeTimeoutReferenceIfSet(toast: ToastItem): void {
    if (toast.closeRef !== undefined) {
      window.clearTimeout(toast.closeRef);
    }
  }

  private _hasAutoClose(toast: ToastItem): boolean {
    return toast && toast.autoClose ? true : false;
  }
}
