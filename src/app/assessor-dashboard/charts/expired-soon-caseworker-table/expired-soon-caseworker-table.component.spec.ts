import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredSoonCaseworkerTableComponent } from './expired-soon-caseworker-table.component';

describe('ExpiredSoonCaseworkerTableComponent', () => {
  let component: ExpiredSoonCaseworkerTableComponent;
  let fixture: ComponentFixture<ExpiredSoonCaseworkerTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpiredSoonCaseworkerTableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredSoonCaseworkerTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
