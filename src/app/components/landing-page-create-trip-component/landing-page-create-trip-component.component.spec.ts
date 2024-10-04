import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageCreateTripComponentComponent } from './landing-page-create-trip-component.component';

describe('LandingPageCreateTripComponentComponent', () => {
  let component: LandingPageCreateTripComponentComponent;
  let fixture: ComponentFixture<LandingPageCreateTripComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingPageCreateTripComponentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingPageCreateTripComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
