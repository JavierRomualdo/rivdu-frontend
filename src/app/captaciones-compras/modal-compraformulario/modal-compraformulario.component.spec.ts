import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCompraformularioComponent } from './modal-compraformulario.component';

describe('ModalCompraformularioComponent', () => {
  let component: ModalCompraformularioComponent;
  let fixture: ComponentFixture<ModalCompraformularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCompraformularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCompraformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
