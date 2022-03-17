import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToptraumaTraumapercentageComponent } from './toptrauma-traumapercentage.component';

describe('ToptraumaTraumapercentageComponent', () => {
  let component: ToptraumaTraumapercentageComponent;
  let fixture: ComponentFixture<ToptraumaTraumapercentageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToptraumaTraumapercentageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToptraumaTraumapercentageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
