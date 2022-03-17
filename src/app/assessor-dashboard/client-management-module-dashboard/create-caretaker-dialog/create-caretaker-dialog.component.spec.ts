import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCaretakerDialogComponent } from './create-caretaker-dialog.component';

describe('CreateCaretakerDialogComponent', () => {
  let component: CreateCaretakerDialogComponent;
  let fixture: ComponentFixture<CreateCaretakerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCaretakerDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCaretakerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
