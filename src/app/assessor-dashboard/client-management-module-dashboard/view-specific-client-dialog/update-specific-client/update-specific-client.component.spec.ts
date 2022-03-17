import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSpecificClientComponent } from './update-specific-client.component';

describe('UpdateSpecificClientComponent', () => {
  let component: UpdateSpecificClientComponent;
  let fixture: ComponentFixture<UpdateSpecificClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateSpecificClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSpecificClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
