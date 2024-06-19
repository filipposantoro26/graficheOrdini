import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdottiComponent } from './prodotti.component';

describe('ProdottiComponent', () => {
  let component: ProdottiComponent;
  let fixture: ComponentFixture<ProdottiComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProdottiComponent]
    });
    fixture = TestBed.createComponent(ProdottiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
