import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEspeficacionesComponent } from './modal-espeficaciones.component';

describe('ModalEspeficacionesComponent', () => {
  let component: ModalEspeficacionesComponent;
  let fixture: ComponentFixture<ModalEspeficacionesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEspeficacionesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEspeficacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
