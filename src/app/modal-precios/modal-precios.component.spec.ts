import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPreciosComponent } from './modal-precios.component';

describe('ModalPreciosComponent', () => {
  let component: ModalPreciosComponent;
  let fixture: ComponentFixture<ModalPreciosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalPreciosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalPreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
