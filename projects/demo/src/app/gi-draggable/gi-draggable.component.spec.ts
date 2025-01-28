import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiDraggableComponent } from './gi-draggable.component';

describe('GiDraggableComponent', () => {
  let component: GiDraggableComponent;
  let fixture: ComponentFixture<GiDraggableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiDraggableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiDraggableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
