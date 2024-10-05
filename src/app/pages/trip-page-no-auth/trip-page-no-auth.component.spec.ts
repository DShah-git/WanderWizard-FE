import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripPageNoAuthComponent } from './trip-page-no-auth.component';

describe('TripPageNoAuthComponent', () => {
  let component: TripPageNoAuthComponent;
  let fixture: ComponentFixture<TripPageNoAuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripPageNoAuthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripPageNoAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
