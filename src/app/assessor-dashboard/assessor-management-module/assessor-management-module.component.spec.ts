import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessorManagementModuleComponent } from './assessor-management-module.component';

describe('AssessorManagementModuleComponent', () => {
  let component: AssessorManagementModuleComponent;
  let fixture: ComponentFixture<AssessorManagementModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AssessorManagementModuleComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessorManagementModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
