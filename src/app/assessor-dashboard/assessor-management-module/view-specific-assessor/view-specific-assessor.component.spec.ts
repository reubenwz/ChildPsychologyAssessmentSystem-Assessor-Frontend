import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificAssessorComponent } from './view-specific-assessor.component';

describe('ViewSpecificAssessorComponent', () => {
  let component: ViewSpecificAssessorComponent;
  let fixture: ComponentFixture<ViewSpecificAssessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpecificAssessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecificAssessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
