import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AISuggestionsModalComponent } from './aisuggestions-modal.component';

describe('AISuggestionsModalComponent', () => {
  let component: AISuggestionsModalComponent;
  let fixture: ComponentFixture<AISuggestionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AISuggestionsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AISuggestionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
