import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecertifiedBarchartComponent } from './recertified-barchart.component';

describe('RecertifiedBarchartComponent', () => {
  let component: RecertifiedBarchartComponent;
  let fixture: ComponentFixture<RecertifiedBarchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecertifiedBarchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecertifiedBarchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
