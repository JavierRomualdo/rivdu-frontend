import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEspecificacionesComponent } from './modal-especificaciones.component';

describe('ModalDescuentosComponent', () => {
  let component: ModalEspecificacionesComponent;
  let fixture: ComponentFixture<ModalEspecificacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEspecificacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEspecificacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
