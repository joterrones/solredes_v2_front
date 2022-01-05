import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TragrupoEditarComponent } from './tragrupo-editar.component';

describe('TragrupoEditarComponent', () => {
  let component: TragrupoEditarComponent;
  let fixture: ComponentFixture<TragrupoEditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TragrupoEditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TragrupoEditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
