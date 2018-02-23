import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDescuentosComponent } from './modal-descuentos.component';

describe('ModalDescuentosComponent', () => {
  let component: ModalDescuentosComponent;
  let fixture: ComponentFixture<ModalDescuentosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalDescuentosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalDescuentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
