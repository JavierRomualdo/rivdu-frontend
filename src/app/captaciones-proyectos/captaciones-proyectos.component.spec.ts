import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptacionesProyectosComponent } from './captaciones-proyectos.component';

describe('CaptacionesProyectosComponent', () => {
  let component: CaptacionesProyectosComponent;
  let fixture: ComponentFixture<CaptacionesProyectosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaptacionesProyectosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptacionesProyectosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
