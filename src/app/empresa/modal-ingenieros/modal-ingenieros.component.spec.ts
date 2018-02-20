import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalIngenierosComponent } from './modal-ingenieros.component';

describe('ModalIngenierosComponent', () => {
  let component: ModalIngenierosComponent;
  let fixture: ComponentFixture<ModalIngenierosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalIngenierosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalIngenierosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
