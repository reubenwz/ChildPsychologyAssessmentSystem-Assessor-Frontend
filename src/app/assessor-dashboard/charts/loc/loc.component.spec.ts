import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LocComponent } from './loc.component';

describe('LocComponent', () => {
  let component: LocComponent;
  let fixture: ComponentFixture<LocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LocComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
