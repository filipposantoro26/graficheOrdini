import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditProdottoComponent } from './add-edit-prodotto.component';

describe('AddEditProdottoComponent', () => {
  let component: AddEditProdottoComponent;
  let fixture: ComponentFixture<AddEditProdottoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEditProdottoComponent]
    });
    fixture = TestBed.createComponent(AddEditProdottoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
