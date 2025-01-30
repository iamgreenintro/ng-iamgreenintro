import { Component, OnInit } from '@angular/core';
import { GiToastContainerComponent, GiToastService, ToastItem } from 'gi-libby';

@Component({
  selector: 'example-gi-toast',
  imports: [GiToastContainerComponent],
  templateUrl: './example-gi-toast.component.html',
  styleUrl: './example-gi-toast.component.scss',
})
export class ExampleGiToastComponent implements OnInit {
  public toasts: ToastItem[] = [];

  constructor(private toastService: GiToastService) {}

  ngOnInit(): void {
    this.toastService.$toasts.subscribe((result) => {
      this.toasts = result;
    });
  }

  onAddSuccesssClick(): void {
    this.toastService.addToast({
      title: 'Success Toast',
      type: 'success',
      message: 'You have succcessfully created a user.',
      autoClose: true,
    });
  }

  onAddDangerClick(): void {
    this.toastService.addToast({
      title: 'Danger Toast',
      type: 'danger',
      message: 'Danger!\nYou will lose access to your account!',
      autoClose: true,
    });
  }

  onAddWarnClick(): void {
    this.toastService.addToast({
      title: 'Success Toast',
      type: 'warn',
      message: 'Something went wrong, please try again.',
      autoClose: true,
    });
  }

  onAddInfoClick(): void {
    this.toastService.addToast({
      title: 'Success Toast',
      type: 'info',
      message: 'The total amount of your balance.',
      autoClose: false,
    });
  }

  doSomethingOnClose(): void {
    console.log('something');
  }

  onToastsChange(val: any): void {
    console.log(val);
  }
}
