import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToggleAssessorActiveDialogComponent } from './toggle-assessor-active-dialog.component';

describe('ToggleAssessorActiveDialogComponent', () => {
  let component: ToggleAssessorActiveDialogComponent;
  let fixture: ComponentFixture<ToggleAssessorActiveDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ToggleAssessorActiveDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ToggleAssessorActiveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
