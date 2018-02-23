import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEstadocivilComponent } from './modal-estadocivil.component';

describe('ModalEstadocivilComponent', () => {
  let component: ModalEstadocivilComponent;
  let fixture: ComponentFixture<ModalEstadocivilComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalEstadocivilComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalEstadocivilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
