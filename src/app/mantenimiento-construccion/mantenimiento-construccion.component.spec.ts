import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoConstruccionComponent } from './mantenimiento-construccion.component';

describe('MantenimientoConstruccionComponent', () => {
  let component: MantenimientoConstruccionComponent;
  let fixture: ComponentFixture<MantenimientoConstruccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoConstruccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoConstruccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
