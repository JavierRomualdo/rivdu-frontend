import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRolesAccesoComponent } from './modal-roles-acceso.component';

describe('ModalRolesAccesoComponent', () => {
  let component: ModalRolesAccesoComponent;
  let fixture: ComponentFixture<ModalRolesAccesoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRolesAccesoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRolesAccesoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
