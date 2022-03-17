import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopstrengthTopneedsComponent } from './topstrength-topneeds.component';

describe('TopstrengthTopneedsComponent', () => {
  let component: TopstrengthTopneedsComponent;
  let fixture: ComponentFixture<TopstrengthTopneedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopstrengthTopneedsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopstrengthTopneedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
