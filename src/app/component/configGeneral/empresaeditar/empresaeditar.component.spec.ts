import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpresaeditarComponent } from './empresaeditar.component';

describe('EmpresaeditarComponent', () => {
  let component: EmpresaeditarComponent;
  let fixture: ComponentFixture<EmpresaeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpresaeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpresaeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
