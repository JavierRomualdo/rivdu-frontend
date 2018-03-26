import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionesExpedientesComponent } from './captaciones-expedientes.component';

describe('CaptacionesExpedientesComponent', () => {
  let component: CaptacionesExpedientesComponent;
  let fixture: ComponentFixture<CaptacionesExpedientesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptacionesExpedientesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptacionesExpedientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
