import { Component, OnInit } from '@angular/core';
import { GiToasterComponent, GiToasterService, ToasterItem } from 'gi-libby';

@Component({
  selector: 'example-toaster-container',
  imports: [GiToasterComponent],
  templateUrl: './gi-toaster.component.html',
  styleUrl: './gi-toaster.component.scss',
})
export class ExampleGiToasterComponent implements OnInit {
  public toasters: ToasterItem[] = [];

  constructor(private toasterService: GiToasterService) {}

  ngOnInit(): void {
    this.toasterService.$toasters.subscribe((result) => {
      this.toasters = result;
    });
  }

  onAddClick(): void {
    this.toasterService.addToaster({
      title: 'Toaster Title ' + Math.random().toFixed(5),
      type: 'success',
      autoClose: true,
    });
  }
}
