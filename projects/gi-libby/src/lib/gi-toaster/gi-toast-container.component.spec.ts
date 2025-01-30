import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiToastContainerComponent } from './gi-toast-container.component';

describe('GiToastContainerComponent', () => {
  let component: GiToastContainerComponent;
  let fixture: ComponentFixture<GiToastContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiToastContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GiToastContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
