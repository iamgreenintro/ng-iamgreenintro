import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({
  selector: '[giDraggable]',
})
export class GiDraggableDirective implements OnInit {
  private offsetX: number = 0;
  private offsetY: number = 0;
  private initialLeft: number = 0;
  private initialTop: number = 0;
  private mouseEventButtonIdentifier: number = 1; // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/buttons

  constructor(private elementRef: ElementRef) {
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseMove = this.handleMouseMove.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
  }
  ngOnInit(): void {
    if (this.elementRef.nativeElement) {
      this.elementRef.nativeElement.style.cursor = 'grab';
      this.elementRef.nativeElement.classList.add('draggable');
      if (this.elementRef.nativeElement.style.position !== 'relative') {
        this.elementRef.nativeElement.style.position = 'absolute';
        this.elementRef.nativeElement.style.top =
          this.elementRef.nativeElement.getBoundingClientRect().top + 'px';
      } else {
        this.elementRef.nativeElement.style.position = 'relative';
      }

      this.elementRef.nativeElement.addEventListener(
        'mousedown',
        this.handleMouseDown
      );
    }
  }

  private handleMouseDown(event: MouseEvent): void {
    if (event.buttons !== this.mouseEventButtonIdentifier) return;

    this.elementRef.nativeElement.style.cursor = 'grabbing';

    this.initialLeft =
      parseInt(this.elementRef.nativeElement.style.left, 10) || 0;
    this.initialTop =
      parseInt(this.elementRef.nativeElement.style.top, 10) || 0;
    this.offsetX = event.clientX;
    this.offsetY = event.clientY;

    document.addEventListener('mousemove', this.handleMouseMove);
    document.addEventListener('mouseup', this.handleMouseUp);
  }

  private handleMouseMove(event: MouseEvent): void {
    const calculatedLeft = this.initialLeft + (event.clientX - this.offsetX);
    const calculatedTop = this.initialTop + (event.clientY - this.offsetY);
    this.elementRef.nativeElement.style.left = `${calculatedLeft}px`;
    this.elementRef.nativeElement.style.top = `${calculatedTop}px`;
  }

  private handleMouseUp(event: MouseEvent): void {
    this.elementRef.nativeElement.style.cursor = 'grab';
    document.removeEventListener('mousemove', this.handleMouseMove);
    document.removeEventListener('mouseup', this.handleMouseUp);
  }
}
