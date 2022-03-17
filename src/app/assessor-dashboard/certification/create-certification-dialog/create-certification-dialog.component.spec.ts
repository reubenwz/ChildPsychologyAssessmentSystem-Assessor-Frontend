import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCertificationDialogComponent } from './create-certification-dialog.component';

describe('CreateCertificationDialogComponent', () => {
  let component: CreateCertificationDialogComponent;
  let fixture: ComponentFixture<CreateCertificationDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCertificationDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCertificationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
