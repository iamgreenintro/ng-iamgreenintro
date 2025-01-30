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

  // Output EventEmitters:
  @Output('close') closeEvent = new EventEmitter();

  constructor(private toasterService: GiToasterService) {}

  ngOnInit(): void {
    this.toasterService.$toasters.subscribe((toasters) => {
      this.closeFirstIfExceededMaxAmount(toasters);
    });
  }

  public close(toasterItem: ToasterItem): void {
    this.toasterService.removeToaster(toasterItem);
    this.closeEvent.emit();
  }

  private closeFirstIfExceededMaxAmount(toasters: ToasterItem[]): void {
    if (toasters.length > this.maxToasterItems) {
      this.close(toasters[0]);
    }
  }
}
