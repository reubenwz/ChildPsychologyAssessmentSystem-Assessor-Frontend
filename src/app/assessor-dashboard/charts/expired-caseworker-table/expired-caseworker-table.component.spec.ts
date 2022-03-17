import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredCaseworkerTableComponent } from './expired-caseworker-table.component';

describe('ExpiredCaseworkerTableComponent', () => {
  let component: ExpiredCaseworkerTableComponent;
  let fixture: ComponentFixture<ExpiredCaseworkerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredCaseworkerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredCaseworkerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
