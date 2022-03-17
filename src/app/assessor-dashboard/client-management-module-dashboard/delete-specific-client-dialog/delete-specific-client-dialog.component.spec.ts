import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteSpecificClientDialogComponent } from './delete-specific-client-dialog.component';

describe('DeleteSpecificClientDialogComponent', () => {
  let component: DeleteSpecificClientDialogComponent;
  let fixture: ComponentFixture<DeleteSpecificClientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DeleteSpecificClientDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteSpecificClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
