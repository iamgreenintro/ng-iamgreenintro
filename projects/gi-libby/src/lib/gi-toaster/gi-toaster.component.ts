import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

type ToasterItem = {
  type: string;
  title: string;
  autoClose: boolean;
};

@Component({
  selector: 'gi-toaster',
  imports: [CommonModule],
  templateUrl: './gi-toaster.component.html',
  styleUrl: './gi-toaster.component.css',
})
export class GiToasterComponent implements OnInit {
  // Input properties (and if applicable their values):
  @Input() toasterType: 'danger' | 'warning' | 'info' | 'success' = 'info';
  @Input() toasterItems!: ToasterItem[];

  // Output EventEmitters:
  @Output('close') closeEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public close(toasterItem: ToasterItem): void {
    console.log(this.toasterItems);
    this.toasterItems.splice(this.toasterItems.indexOf(toasterItem), 1);
    this.closeEvent.emit();
  }
}
