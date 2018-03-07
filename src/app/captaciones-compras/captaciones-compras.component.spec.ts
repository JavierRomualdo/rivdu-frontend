import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionesComprasComponent } from './captaciones-compras.component';

describe('CaptacionesComprasComponent', () => {
  let component: CaptacionesComprasComponent;
  let fixture: ComponentFixture<CaptacionesComprasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptacionesComprasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptacionesComprasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
