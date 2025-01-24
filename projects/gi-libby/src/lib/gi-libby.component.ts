import { Component, Input } from '@angular/core';

@Component({
  selector: 'lib-gi-libby',
  imports: [],
  template: ` <p>gi-libby works!</p> `,
  styles: ``,
})
export class GiLibbyComponent {
  @Input() multiple: boolean = false;
}
