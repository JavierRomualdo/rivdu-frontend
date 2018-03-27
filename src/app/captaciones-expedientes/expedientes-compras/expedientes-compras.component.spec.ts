import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpedientesComprasComponent } from './expedientes-compras.component';

describe('ExpedientesComprasComponent', () => {
  let component: ExpedientesComprasComponent;
  let fixture: ComponentFixture<ExpedientesComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpedientesComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpedientesComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
