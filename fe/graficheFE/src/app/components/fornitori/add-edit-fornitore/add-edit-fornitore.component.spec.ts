import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditFornitoreComponent } from './add-edit-fornitore.component';

describe('AddEditFornitoreComponent', () => {
  let component: AddEditFornitoreComponent;
  let fixture: ComponentFixture<AddEditFornitoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditFornitoreComponent]
    });
    fixture = TestBed.createComponent(AddEditFornitoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
