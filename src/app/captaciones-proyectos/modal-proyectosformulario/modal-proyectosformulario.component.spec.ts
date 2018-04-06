import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProyectosformularioComponent } from './modal-proyectosformulario.component';

describe('ModalProyectosformularioComponent', () => {
  let component: ModalProyectosformularioComponent;
  let fixture: ComponentFixture<ModalProyectosformularioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProyectosformularioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProyectosformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
