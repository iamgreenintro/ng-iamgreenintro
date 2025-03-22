import { CommonModule } from '@angular/common';
import {
  booleanAttribute,
  Component,
  EventEmitter,
  Input,
  numberAttribute,
  OnInit,
  Output,
} from '@angular/core';
import { ToastItem } from './types';
import { GiToastService } from './gi-toast.service';

@Component({
  selector: 'gi-toast-container',
  imports: [CommonModule],
  templateUrl: './gi-toast-container.component.html',
  styleUrl: './gi-toast-container.component.scss',
})
export class GiToastContainerComponent implements OnInit {
  // ## Inputs:
  @Input() toastItems: ToastItem[] = [];
  @Input({ transform: numberAttribute }) maxToastItems: number = 4;
  @Input({ transform: numberAttribute }) toastDurationInMs: number = 5000;
  @Input({ transform: booleanAttribute }) animate: boolean = false;
  @Input() animateAddDirection: 'right' | 'left' | 'top' | 'bottom' = 'right';
  @Input() animateCloseDirection: 'right' | 'left' | 'top' | 'bottom' = 'right';

  // ## Output EventEmitters:
  @Output('close') closeEvent = new EventEmitter();
  @Output('toastListChange') toastListChangeEvent = new EventEmitter();

  private _toastCount: number = 0;

  constructor(private toastService: GiToastService) {}

  ngOnInit(): void {
    this.toastService.$toasts.subscribe((toasts) => {
      this._onToastListChange(toasts);
    });
  }

  public close(toast: ToastItem): void {
    this._removeTimeoutReferenceIfSet(toast);
    this.toastService.removeToast(toast);
    this.closeEvent.emit();
  }

  private _onToastListChange(newToastList: ToastItem[]): void {
    if (newToastList.length > this._toastCount) {
      this._onToastAdd(newToastList);
      this.toastListChangeEvent.emit('added!');
    } else {
      this.toastListChangeEvent.emit('closed!');
    }
    this._toastCount = newToastList.length;
  }

  private _onToastAdd(toastList: ToastItem[]): void {
    this._closeFirstIfExceededMaxAmount(toastList);
    const toast = toastList[toastList.length - 1];
    if (this._hasAutoClose(toast)) {
      toast.closeRef = window.setTimeout(() => {
        this.close(toast);
      }, this.toastDurationInMs);
    }
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
