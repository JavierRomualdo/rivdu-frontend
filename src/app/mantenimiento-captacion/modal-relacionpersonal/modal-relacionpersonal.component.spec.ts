import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRelacionpersonalComponent } from './modal-relacionpersonal.component';

describe('ModalRelacionpersonalComponent', () => {
  let component: ModalRelacionpersonalComponent;
  let fixture: ComponentFixture<ModalRelacionpersonalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalRelacionpersonalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRelacionpersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
