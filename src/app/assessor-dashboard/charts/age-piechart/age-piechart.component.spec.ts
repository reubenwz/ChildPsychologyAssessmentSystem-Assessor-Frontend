import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgePiechartComponent } from './age-piechart.component';

describe('AgePiechartComponent', () => {
  let component: AgePiechartComponent;
  let fixture: ComponentFixture<AgePiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgePiechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AgePiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
