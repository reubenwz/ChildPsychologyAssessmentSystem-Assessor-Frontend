import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateAssessorDialogComponent } from './create-assessor-dialog.component';

describe('CreateAssessorDialogComponent', () => {
  let component: CreateAssessorDialogComponent;
  let fixture: ComponentFixture<CreateAssessorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateAssessorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateAssessorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
