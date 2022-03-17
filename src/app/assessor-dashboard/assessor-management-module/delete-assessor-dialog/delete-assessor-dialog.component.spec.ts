import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteAssessorDialogComponent } from './delete-assessor-dialog.component';

describe('DeleteAssessorDialogComponent', () => {
  let component: DeleteAssessorDialogComponent;
  let fixture: ComponentFixture<DeleteAssessorDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteAssessorDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteAssessorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
