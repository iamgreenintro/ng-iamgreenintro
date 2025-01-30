import { Component, OnInit } from '@angular/core';
import {
  GiToastContainerComponent,
  GiToastService,
  ToasterItem,
} from 'gi-libby';

@Component({
  selector: 'example-gi-toast',
  imports: [GiToastContainerComponent],
  templateUrl: './example-gi-toast.component.html',
  styleUrl: './example-gi-toast.component.scss',
})
export class ExampleGiToastComponent implements OnInit {
  public toasters: ToasterItem[] = [];

  constructor(private toastService: GiToastService) {}

  ngOnInit(): void {
    this.toastService.$toasters.subscribe((result) => {
      this.toasters = result;
    });
  }

  onAddSuccesssClick(): void {
    this.toastService.addToast({
      title: 'Success Toaster',
      type: 'success',
      message: 'You have succcessfully created a user.',
      autoClose: true,
    });
  }

  onAddDangerClick(): void {
    this.toastService.addToast({
      title: 'Danger Toaster',
      type: 'danger',
      message: 'Danger!\nYou will lose access to your account!',
      autoClose: true,
    });
  }

  onAddWarnClick(): void {
    this.toastService.addToast({
      title: 'Success Toaster',
      type: 'warn',
      message: 'Something went wrong, please try again.',
      autoClose: true,
    });
  }

  onAddInfoClick(): void {
    this.toastService.addToast({
      title: 'Success Toaster',
      type: 'info',
      message: 'The total amount of your balance.',
      autoClose: true,
    });
  }

  doSomethingOnClose(): void {
    console.log('something');
  }
}
