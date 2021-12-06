import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActividadeditComponent } from './actividadedit.component';

describe('ActividadeditComponent', () => {
  let component: ActividadeditComponent;
  let fixture: ComponentFixture<ActividadeditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActividadeditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActividadeditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
