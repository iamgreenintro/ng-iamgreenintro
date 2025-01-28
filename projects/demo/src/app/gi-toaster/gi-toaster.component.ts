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

  onAddSuccesssClick(): void {
    this.toasterService.addToaster({
      title: 'Success Toaster',
      type: 'success',
      message: 'You have succcessfully created a user.',
      autoClose: true,
    });
  }

  onAddDangerClick(): void {
    this.toasterService.addToaster({
      title: 'Danger Toaster',
      type: 'danger',
      message: 'Danger!\nYou will lose access to your account!',
      autoClose: true,
    });
  }
}
