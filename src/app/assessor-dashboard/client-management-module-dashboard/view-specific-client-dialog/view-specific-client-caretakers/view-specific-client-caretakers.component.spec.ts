import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSpecificClientCaretakersComponent } from './view-specific-client-caretakers.component';

describe('ViewSpecificClientCaretakersComponent', () => {
  let component: ViewSpecificClientCaretakersComponent;
  let fixture: ComponentFixture<ViewSpecificClientCaretakersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ViewSpecificClientCaretakersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSpecificClientCaretakersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
