import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RolesPiechartComponent } from './roles-piechart.component';

describe('RolesPiechartComponent', () => {
  let component: RolesPiechartComponent;
  let fixture: ComponentFixture<RolesPiechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RolesPiechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RolesPiechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
