import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificCertificationDialogComponent } from './view-specific-certification-dialog.component';

describe('ViewSpecificCertificationDialogComponent', () => {
  let component: ViewSpecificCertificationDialogComponent;
  let fixture: ComponentFixture<ViewSpecificCertificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpecificCertificationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecificCertificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
