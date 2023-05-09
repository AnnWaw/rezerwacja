import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationHeaderComponent } from './reservation-header.component';

describe('ReservationHeaderComponent', () => {
  let component: ReservationHeaderComponent;
  let fixture: ComponentFixture<ReservationHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
