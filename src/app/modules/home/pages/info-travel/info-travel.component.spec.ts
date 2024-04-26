import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTravelComponent } from './info-travel.component';

describe('InfoTravelComponent', () => {
  let component: InfoTravelComponent;
  let fixture: ComponentFixture<InfoTravelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InfoTravelComponent]
    });
    fixture = TestBed.createComponent(InfoTravelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
