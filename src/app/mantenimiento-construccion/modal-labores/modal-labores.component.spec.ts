import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalLaboresComponent } from './modal-labores.component';

describe('ModalLaboresComponent', () => {
  let component: ModalLaboresComponent;
  let fixture: ComponentFixture<ModalLaboresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalLaboresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalLaboresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
