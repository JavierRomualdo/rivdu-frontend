import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoTesoreriaComponent } from './mantenimiento-tesoreria.component';

describe('MantenimientoTesoreriaComponent', () => {
  let component: MantenimientoTesoreriaComponent;
  let fixture: ComponentFixture<MantenimientoTesoreriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoTesoreriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoTesoreriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
