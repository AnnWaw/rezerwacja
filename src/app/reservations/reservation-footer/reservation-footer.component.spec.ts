import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationFooterComponent } from './reservation-footer.component';

describe('ReservationFooterComponent', () => {
  let component: ReservationFooterComponent;
  let fixture: ComponentFixture<ReservationFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationFooterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
