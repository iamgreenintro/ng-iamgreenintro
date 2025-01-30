import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleGiToastComponent } from './example-gi-toast.component';

describe('ExampleGiToastComponent', () => {
  let component: ExampleGiToastComponent;
  let fixture: ComponentFixture<ExampleGiToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleGiToastComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleGiToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
