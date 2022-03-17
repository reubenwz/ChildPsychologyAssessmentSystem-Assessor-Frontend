import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpecificCertificationComponent } from './update-specific-certification.component';

describe('UpdateSpecificCertificationComponent', () => {
  let component: UpdateSpecificCertificationComponent;
  let fixture: ComponentFixture<UpdateSpecificCertificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSpecificCertificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpecificCertificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
