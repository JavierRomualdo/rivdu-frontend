import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalResponsablesComponent } from './modal-responsables.component';

describe('ModalResponsablesComponent', () => {
  let component: ModalResponsablesComponent;
  let fixture: ComponentFixture<ModalResponsablesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalResponsablesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalResponsablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
