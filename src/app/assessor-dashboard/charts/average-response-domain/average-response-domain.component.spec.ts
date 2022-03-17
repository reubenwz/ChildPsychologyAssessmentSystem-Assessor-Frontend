import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AverageResponseDomainComponent } from './average-response-domain.component';

describe('AverageResponseDomainComponent', () => {
  let component: AverageResponseDomainComponent;
  let fixture: ComponentFixture<AverageResponseDomainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AverageResponseDomainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AverageResponseDomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
