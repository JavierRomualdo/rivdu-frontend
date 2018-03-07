import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionesVentasComponent } from './captaciones-ventas.component';

describe('CaptacionesVentasComponent', () => {
  let component: CaptacionesVentasComponent;
  let fixture: ComponentFixture<CaptacionesVentasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptacionesVentasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptacionesVentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
