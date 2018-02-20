import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalApoderadosComponent } from './modal-apoderados.component';

describe('ModalApoderadosComponent', () => {
  let component: ModalApoderadosComponent;
  let fixture: ComponentFixture<ModalApoderadosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalApoderadosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalApoderadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
