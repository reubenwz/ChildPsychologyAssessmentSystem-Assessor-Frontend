import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpecificAssessorComponent } from './update-specific-assessor.component';

describe('UpdateSpecificAssessorComponent', () => {
  let component: UpdateSpecificAssessorComponent;
  let fixture: ComponentFixture<UpdateSpecificAssessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSpecificAssessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpecificAssessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
