import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProgramasComponent } from './modal-programas.component';

describe('ModalProgramasComponent', () => {
  let component: ModalProgramasComponent;
  let fixture: ComponentFixture<ModalProgramasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalProgramasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
