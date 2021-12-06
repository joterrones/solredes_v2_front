import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiaferiadoComponent } from './diaferiado.component';

describe('DiaferiadoComponent', () => {
  let component: DiaferiadoComponent;
  let fixture: ComponentFixture<DiaferiadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiaferiadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiaferiadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
