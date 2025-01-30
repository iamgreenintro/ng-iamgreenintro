import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiToasterContainerComponent } from './gi-toaster-container.component';

describe('GiToasterComponent', () => {
  let component: GiToasterContainerComponent;
  let fixture: ComponentFixture<GiToasterContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiToasterContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GiToasterContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
