import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenderPiechartComponent } from './gender-piechart.component';

describe('GenderPiechartComponent', () => {
  let component: GenderPiechartComponent;
  let fixture: ComponentFixture<GenderPiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenderPiechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GenderPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
