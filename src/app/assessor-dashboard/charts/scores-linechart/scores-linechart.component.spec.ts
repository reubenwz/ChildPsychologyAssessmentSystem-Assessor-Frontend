import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoresLinechartComponent } from './scores-linechart.component';

describe('ScoresLinechartComponent', () => {
  let component: ScoresLinechartComponent;
  let fixture: ComponentFixture<ScoresLinechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ScoresLinechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoresLinechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
