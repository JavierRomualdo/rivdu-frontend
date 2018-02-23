import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCuentasComponent } from './modal-cuentas.component';

describe('ModalCuentasComponent', () => {
  let component: ModalCuentasComponent;
  let fixture: ComponentFixture<ModalCuentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCuentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
