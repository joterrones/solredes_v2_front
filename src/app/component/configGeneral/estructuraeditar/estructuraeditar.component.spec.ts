import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EstructuraeditarComponent } from './estructuraeditar.component';

describe('EstructuraeditarComponent', () => {
  let component: EstructuraeditarComponent;
  let fixture: ComponentFixture<EstructuraeditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EstructuraeditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EstructuraeditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
