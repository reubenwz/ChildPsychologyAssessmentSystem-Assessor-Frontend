import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRedirectorComponent } from './main-redirector.component';

describe('MainRedirectorComponent', () => {
  let component: MainRedirectorComponent;
  let fixture: ComponentFixture<MainRedirectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainRedirectorComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainRedirectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
