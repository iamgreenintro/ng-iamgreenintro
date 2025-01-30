import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToasterItem } from './types';

@Component({
  selector: 'gi-toaster-container',
  imports: [CommonModule],
  templateUrl: './gi-toaster-container.component.html',
  styleUrl: './gi-toaster-container.component.scss',
})
export class GiToasterContainerComponent implements OnInit {
  // Input properties (and if applicable their (initial) default values):
  @Input() toasterItems: ToasterItem[] = [];

  // Output EventEmitters:
  @Output('close') closeEvent = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  public close(toasterItem: ToasterItem): void {
    this.toasterItems.splice(this.toasterItems.indexOf(toasterItem), 1);
    this.closeEvent.emit();
  }
}
