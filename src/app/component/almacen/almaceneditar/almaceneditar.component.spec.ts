import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlmaceneditarComponent } from './almaceneditar.component';

describe('AlmaceneditarComponent', () => {
  let component: AlmaceneditarComponent;
  let fixture: ComponentFixture<AlmaceneditarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlmaceneditarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlmaceneditarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
