import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaProgramasComponent } from './lista-programas.component';

describe('ListaProgramasComponent', () => {
  let component: ListaProgramasComponent;
  let fixture: ComponentFixture<ListaProgramasComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaProgramasComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaProgramasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
