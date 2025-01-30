import { Component, OnInit } from '@angular/core';
import {
  GiToasterContainerComponent,
  GiToasterService,
  ToasterItem,
} from 'gi-libby';

@Component({
  selector: 'example-gi-toaster',
  imports: [GiToasterContainerComponent],
  templateUrl: './example-gi-toaster.component.html',
  styleUrl: './example-gi-toaster.component.scss',
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

  onAddWarnClick(): void {
    this.toasterService.addToaster({
      title: 'Success Toaster',
      type: 'warn',
      message: 'Something went wrong, please try again.',
      autoClose: true,
    });
  }

  onAddInfoClick(): void {
    this.toasterService.addToaster({
      title: 'Success Toaster',
      type: 'info',
      message: 'The total amount of your balance.',
      autoClose: true,
    });
  }
}
