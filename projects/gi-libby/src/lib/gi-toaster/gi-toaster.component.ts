import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToasterItem } from './types';

@Component({
  selector: 'gi-toaster',
  imports: [CommonModule],
  templateUrl: './gi-toaster.component.html',
  styleUrl: './gi-toaster.component.scss',
})
export class GiToasterComponent implements OnInit {
  // Input properties (and if applicable their (initial) default values):
  @Input() toasterItems: ToasterItem[] = [];

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
