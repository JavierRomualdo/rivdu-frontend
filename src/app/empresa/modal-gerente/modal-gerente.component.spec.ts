import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ModalGerenteComponent } from './modal-gerente.component';

describe('ModalGerenteComponent', () => {
  let component: ModalGerenteComponent;
  let fixture: ComponentFixture<ModalGerenteComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalGerenteComponent ]
    })
    .compileComponents();
  }));
  beforeEach(() => {
    fixture = TestBed.createComponent(ModalGerenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
