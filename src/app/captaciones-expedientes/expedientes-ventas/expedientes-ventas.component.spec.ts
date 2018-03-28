import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesVentasComponent } from './expedientes-ventas.component';

describe('ExpedientesVentasComponent', () => {
  let component: ExpedientesVentasComponent;
  let fixture: ComponentFixture<ExpedientesVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedientesVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientesVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
