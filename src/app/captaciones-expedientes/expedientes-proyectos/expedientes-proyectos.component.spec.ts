import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesProyectosComponent } from './expedientes-proyectos.component';

describe('ExpedientesProyectosComponent', () => {
  let component: ExpedientesProyectosComponent;
  let fixture: ComponentFixture<ExpedientesProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedientesProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientesProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
