import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToasterItem } from './types';
import { GiToasterService } from './gi-toaster.service';

@Component({
  selector: 'gi-toaster-container',
  imports: [CommonModule],
  templateUrl: './gi-toaster-container.component.html',
  styleUrl: './gi-toaster-container.component.scss',
})
export class GiToasterContainerComponent implements OnInit {
  // Input properties (and if applicable their (initial) default values):
  @Input() toasterItems: ToasterItem[] = [];
  @Input() maxToasterItems: number = 4;
  @Input() toasterDurationInMs: number = 5000;

  // Output EventEmitters:
  @Output('close') closeEvent = new EventEmitter();

  constructor(private toasterService: GiToasterService) {}

  ngOnInit(): void {
    this.toasterService.$toasters.subscribe((toasters) => {
      this.closeFirstIfExceededMaxAmount(toasters);
      const toaster: ToasterItem = toasters[toasters.length - 1];
      if (this.hasAutoClose(toaster)) {
        if (toaster.closeRef === undefined) {
          toaster.closeRef = window.setTimeout(() => {
            this.close(toaster);
          }, this.toasterDurationInMs);
        }
      }
    });
  }

  public close(toasterItem: ToasterItem): void {
    if (toasterItem.closeRef !== undefined) {
      window.clearTimeout(toasterItem.closeRef);
    }
    this.toasterService.removeToaster(toasterItem);
    this.closeEvent.emit();
  }

  private closeFirstIfExceededMaxAmount(toasters: ToasterItem[]): void {
    if (toasters.length > this.maxToasterItems) {
      if (toasters[0].closeRef !== undefined) {
        window.clearTimeout(toasters[0].closeRef);
        this.close(toasters[0]);
      }
    }
  }

  private hasAutoClose(toaster: ToasterItem): boolean {
    return toaster && toaster.autoClose ? true : false;
  }
}
