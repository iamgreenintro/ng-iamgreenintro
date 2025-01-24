import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiToasterComponent } from './gi-toaster.component';

describe('GiToasterComponent', () => {
  let component: GiToasterComponent;
  let fixture: ComponentFixture<GiToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiToasterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
