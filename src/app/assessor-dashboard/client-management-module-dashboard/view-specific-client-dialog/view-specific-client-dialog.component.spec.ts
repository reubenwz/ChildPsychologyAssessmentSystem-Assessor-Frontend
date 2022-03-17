import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificClientDialogComponent } from './view-specific-client-dialog.component';

describe('ViewSpecificClientDialogComponent', () => {
  let component: ViewSpecificClientDialogComponent;
  let fixture: ComponentFixture<ViewSpecificClientDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewSpecificClientDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecificClientDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
