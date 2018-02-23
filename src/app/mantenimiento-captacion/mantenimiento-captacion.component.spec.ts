import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MantenimientoCaptacionComponent } from './mantenimiento-captacion.component';

describe('MantenimientoCaptacionComponent', () => {
  let component: MantenimientoCaptacionComponent;
  let fixture: ComponentFixture<MantenimientoCaptacionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MantenimientoCaptacionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MantenimientoCaptacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
