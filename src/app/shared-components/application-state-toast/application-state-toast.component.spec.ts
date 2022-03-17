import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationStateToastComponent } from './application-state-toast.component';

describe('ApplicationStateToastComponent', () => {
  let component: ApplicationStateToastComponent;
  let fixture: ComponentFixture<ApplicationStateToastComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationStateToastComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApplicationStateToastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
