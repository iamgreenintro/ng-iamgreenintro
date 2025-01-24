import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GiLibbyComponent } from './gi-libby.component';

describe('GiLibbyComponent', () => {
  let component: GiLibbyComponent;
  let fixture: ComponentFixture<GiLibbyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GiLibbyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GiLibbyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
