import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TokenPasswordChangeComponent } from './token-password-change.component';

describe('TokenPasswordChangeComponent', () => {
  let component: TokenPasswordChangeComponent;
  let fixture: ComponentFixture<TokenPasswordChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TokenPasswordChangeComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TokenPasswordChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
