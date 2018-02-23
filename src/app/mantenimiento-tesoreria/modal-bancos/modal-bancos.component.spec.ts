import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalBancosComponent } from './modal-bancos.component';

describe('ModalBancosComponent', () => {
  let component: ModalBancosComponent;
  let fixture: ComponentFixture<ModalBancosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalBancosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalBancosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
