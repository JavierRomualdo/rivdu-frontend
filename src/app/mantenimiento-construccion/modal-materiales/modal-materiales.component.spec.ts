import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMaterialesComponent } from './modal-materiales.component';

describe('ModalMaterialesComponent', () => {
  let component: ModalMaterialesComponent;
  let fixture: ComponentFixture<ModalMaterialesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalMaterialesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalMaterialesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
