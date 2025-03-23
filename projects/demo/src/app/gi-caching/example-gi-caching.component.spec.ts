import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleGiCachingComponent } from './example-gi-caching.component';

describe('ExampleGiCachingComponent', () => {
  let component: ExampleGiCachingComponent;
  let fixture: ComponentFixture<ExampleGiCachingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExampleGiCachingComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ExampleGiCachingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
