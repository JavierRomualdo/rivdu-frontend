import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCaptadorComponent } from './modal-captador.component';

describe('ModalCaptadorComponent', () => {
  let component: ModalCaptadorComponent;
  let fixture: ComponentFixture<ModalCaptadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCaptadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCaptadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
