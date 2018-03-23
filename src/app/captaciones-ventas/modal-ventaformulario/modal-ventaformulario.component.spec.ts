import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVentaformularioComponent } from './modal-ventaformulario.component';

describe('ModalVentaformularioComponent', () => {
  let component: ModalVentaformularioComponent;
  let fixture: ComponentFixture<ModalVentaformularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalVentaformularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalVentaformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
