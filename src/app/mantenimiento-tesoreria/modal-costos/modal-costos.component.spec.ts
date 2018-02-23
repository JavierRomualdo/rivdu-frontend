import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCostosComponent } from './modal-costos.component';

describe('ModalCostosComponent', () => {
  let component: ModalCostosComponent;
  let fixture: ComponentFixture<ModalCostosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalCostosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalCostosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
