import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FornitoriComponent } from './fornitori.component';

describe('FornitoriComponent', () => {
  let component: FornitoriComponent;
  let fixture: ComponentFixture<FornitoriComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FornitoriComponent]
    });
    fixture = TestBed.createComponent(FornitoriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
