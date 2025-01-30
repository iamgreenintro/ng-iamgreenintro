import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleGiToasterComponent } from './example-gi-toaster.component';

describe('GiToasterComponent', () => {
  let component: ExampleGiToasterComponent;
  let fixture: ComponentFixture<ExampleGiToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleGiToasterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleGiToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
