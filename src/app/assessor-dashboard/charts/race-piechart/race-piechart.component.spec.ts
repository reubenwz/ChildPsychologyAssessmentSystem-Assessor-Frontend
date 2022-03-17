import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RacePiechartComponent } from './race-piechart.component';

describe('RacePiechartComponent', () => {
  let component: RacePiechartComponent;
  let fixture: ComponentFixture<RacePiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RacePiechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RacePiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
